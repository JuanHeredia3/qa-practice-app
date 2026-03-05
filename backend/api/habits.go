package api

import (
	"errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	db "github.com/qa-practice-project/db/sqlc"
)

type createHabitRequest struct {
	ColumnID  uuid.UUID   `json:"column_id" binding:"required"`
	Name      string      `json:"name" binding:"required"`
	Status    string      `json:"status" binding:"required"`
	Frequency []int32     `json:"frequency" binding:"required"`
	TimeSpent pgtype.Text `json:"time_spent" binding:"required"`
}

func (server *Server) createHabit(ctx *gin.Context) {
	var req createHabitRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.CreateHabitParams{
		ID:        uuid.New(),
		ColumnID:  req.ColumnID,
		Name:      req.Name,
		Status:    req.Status,
		Frequency: req.Frequency,
		TimeSpent: req.TimeSpent,
	}

	habit, err := server.store.CreateHabit(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, habit)
}

func (server *Server) listHabits(ctx *gin.Context) {
	habits, err := server.store.ListHabits(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, habits)
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

	column, err := server.store.ListHabitsByTracker(ctx, id)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, errorResponse(errors.New("tracker not found")))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, column)
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

	column, err := server.store.ListHabitsByColumn(ctx, id)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, errorResponse(errors.New("column not found")))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, column)
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

	column, err := server.store.GetHabit(ctx, id)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, errorResponse(errors.New("habit not found")))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, column)
}

type updateHabitRequest struct {
	ID        uuid.UUID `json:"id" binding:"required"`
	ColumnID  uuid.UUID `json:"column_id"`
	Name      string    `json:"name"`
	Status    string    `json:"status"`
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
		Status: pgtype.Text{
			String: req.Status,
			Valid:  req.Status != "",
		},
		TimeSpent: pgtype.Text{
			String: req.TimeSpent,
			Valid:  req.TimeSpent != "",
		},
		ModifiedAt: pgtype.Timestamptz{
			Time:  time.Now(),
			Valid: true,
		},
	}

	if req.Frequency != nil {
		arg.Frequency = *req.Frequency
	}

	column, err := server.store.UpdateHabit(ctx, arg)
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

	ctx.JSON(http.StatusOK, column)
}
