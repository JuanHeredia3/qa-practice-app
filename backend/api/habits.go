package api

import (
	"errors"
	"fmt"
	"net/http"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	db "github.com/qa-practice-project/db/sqlc"
)

type habitResponse struct {
	ID         uuid.UUID `json:"id"`
	ColumnID   uuid.UUID `json:"column_id"`
	Name       string    `json:"name"`
	Status     bool      `json:"status"`
	Frequency  []int32   `json:"frequency"`
	TimeSpent  string    `json:"time_spent"`
	CreatedAt  time.Time `json:"created_at"`
	ModifiedAt time.Time `json:"modified_at"`
}

type createHabitRequest struct {
	ColumnID  uuid.UUID `json:"column_id" binding:"required"`
	Name      string    `json:"name" binding:"required"`
	Frequency []int32   `json:"frequency" binding:"required"`
	TimeSpent string    `json:"time_spent" binding:"required"`
}

func (server *Server) createHabit(ctx *gin.Context) {
	var req createHabitRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	durationRegex := regexp.MustCompile(`^\d+(\.\d+)?h$`)

	if !durationRegex.MatchString(req.TimeSpent) {
		ctx.JSON(http.StatusBadRequest, errorResponse(errors.New("invalid time format, use Xh or X.Yh")))
		return
	}

	value := strings.TrimSuffix(req.TimeSpent, "h")
	hours, _ := strconv.ParseFloat(value, 64)
	minutes := int32(hours * 60)

	arg := db.CreateHabitParams{
		ID:               uuid.New(),
		ColumnID:         req.ColumnID,
		Name:             req.Name,
		Status:           true,
		Frequency:        req.Frequency,
		TimeSpentMinutes: minutes,
	}

	habit, err := server.store.CreateHabit(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	response := habitResponse{
		ID:         habit.ID,
		ColumnID:   habit.ColumnID,
		Name:       habit.Name,
		Status:     habit.Status,
		Frequency:  habit.Frequency,
		TimeSpent:  formatMinutesToHours(habit.TimeSpentMinutes),
		CreatedAt:  habit.CreatedAt,
		ModifiedAt: habit.ModifiedAt,
	}

	ctx.JSON(http.StatusOK, response)
}

func (server *Server) listHabits(ctx *gin.Context) {
	habits, err := server.store.ListHabits(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	var response []habitResponse

	for _, h := range habits {
		response = append(response, habitResponse{
			ID:         h.ID,
			ColumnID:   h.ColumnID,
			Name:       h.Name,
			Status:     h.Status,
			Frequency:  h.Frequency,
			TimeSpent:  formatMinutesToHours(h.TimeSpentMinutes),
			CreatedAt:  h.CreatedAt,
			ModifiedAt: h.ModifiedAt,
		})
	}

	ctx.JSON(http.StatusOK, response)
}

type listHabitsByTrackerRequest struct {
	TrackerID string `uri:"id" binding:"required"`
}

func (server *Server) listHabitsByTracker(ctx *gin.Context) {
	var req listHabitsByTrackerRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	id, err := uuid.Parse(req.TrackerID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(errors.New("invalid UUID format")))
		return
	}

	habits, err := server.store.ListHabitsByTracker(ctx, id)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, errorResponse(errors.New("tracker not found")))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	var response []habitResponse

	for _, h := range habits {
		response = append(response, habitResponse{
			ID:         h.ID,
			ColumnID:   h.ColumnID,
			Name:       h.Name,
			Status:     h.Status,
			Frequency:  h.Frequency,
			TimeSpent:  formatMinutesToHours(h.TimeSpentMinutes),
			CreatedAt:  h.CreatedAt,
			ModifiedAt: h.ModifiedAt,
		})
	}

	ctx.JSON(http.StatusOK, response)
}

type listHabitsByColumnRequest struct {
	ColumnID string `uri:"id" binding:"required"`
}

func (server *Server) listHabitsByColumn(ctx *gin.Context) {
	var req listHabitsByColumnRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	id, err := uuid.Parse(req.ColumnID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(errors.New("invalid UUID format")))
		return
	}

	habits, err := server.store.ListHabitsByColumn(ctx, id)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, errorResponse(errors.New("column not found")))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	var response []habitResponse

	for _, h := range habits {
		response = append(response, habitResponse{
			ID:         h.ID,
			ColumnID:   h.ColumnID,
			Name:       h.Name,
			Status:     h.Status,
			Frequency:  h.Frequency,
			TimeSpent:  formatMinutesToHours(h.TimeSpentMinutes),
			CreatedAt:  h.CreatedAt,
			ModifiedAt: h.ModifiedAt,
		})
	}

	ctx.JSON(http.StatusOK, response)
}

type getHabitRequest struct {
	ID string `uri:"id" binding:"required"`
}

func (server *Server) getHabit(ctx *gin.Context) {
	var req getHabitRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	id, err := uuid.Parse(req.ID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(errors.New("invalid UUID format")))
		return
	}

	habit, err := server.store.GetHabit(ctx, id)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, errorResponse(errors.New("habit not found")))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	response := habitResponse{
		ID:         habit.ID,
		ColumnID:   habit.ColumnID,
		Name:       habit.Name,
		Status:     habit.Status,
		Frequency:  habit.Frequency,
		TimeSpent:  formatMinutesToHours(habit.TimeSpentMinutes),
		CreatedAt:  habit.CreatedAt,
		ModifiedAt: habit.ModifiedAt,
	}

	ctx.JSON(http.StatusOK, response)
}

type updateHabitRequest struct {
	ID        uuid.UUID `json:"id" binding:"required"`
	ColumnID  uuid.UUID `json:"column_id"`
	Name      string    `json:"name"`
	Status    *bool     `json:"status"`
	Frequency *[]int32  `json:"frequency"`
	TimeSpent string    `json:"time_spent"`
}

func (server *Server) updateHabit(ctx *gin.Context) {
	var req updateHabitRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.UpdateHabitParams{
		ID: req.ID,
		ColumnID: pgtype.UUID{
			Bytes: req.ColumnID,
			Valid: req.ColumnID != uuid.Nil,
		},
		Name: pgtype.Text{
			String: req.Name,
			Valid:  req.Name != "",
		},
		Status: pgtype.Bool{
			Bool:  *req.Status,
			Valid: req.Status != nil,
		},
		ModifiedAt: pgtype.Timestamptz{
			Time:  time.Now(),
			Valid: true,
		},
	}

	if req.Frequency != nil {
		arg.Frequency = *req.Frequency
	}

	if req.TimeSpent != "" {
		durationRegex := regexp.MustCompile(`^\d+(\.\d+)?h$`)

		if !durationRegex.MatchString(req.TimeSpent) {
			ctx.JSON(http.StatusBadRequest, errorResponse(errors.New("invalid time format, use Xh or X.Yh")))
			return
		}

		value := strings.TrimSuffix(req.TimeSpent, "h")
		hours, _ := strconv.ParseFloat(value, 64)
		minutes := int32(hours * 60)

		arg.TimeSpentMinutes = pgtype.Int4{
			Int32: minutes,
			Valid: true,
		}
	}

	habit, err := server.store.UpdateHabit(ctx, arg)
	if err != nil {
		if db.ErrorCode(err) == db.ForeignKeyViolation {
			ctx.JSON(http.StatusBadRequest, errorResponse(errors.New("column not found")))
			return
		}

		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, errorResponse(errors.New("habit not found")))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	response := habitResponse{
		ID:         habit.ID,
		ColumnID:   habit.ColumnID,
		Name:       habit.Name,
		Status:     habit.Status,
		Frequency:  habit.Frequency,
		TimeSpent:  formatMinutesToHours(habit.TimeSpentMinutes),
		CreatedAt:  habit.CreatedAt,
		ModifiedAt: habit.ModifiedAt,
	}

	ctx.JSON(http.StatusOK, response)
}

func formatMinutesToHours(minutes int32) string {
	hours := float32(minutes) / 60.0

	if hours == float32(int32(hours)) {
		return fmt.Sprintf("%.0fh", hours)
	}

	return fmt.Sprintf("%.1fh", hours)
}
