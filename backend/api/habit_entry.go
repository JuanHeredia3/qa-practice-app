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

type habitEntryResponse struct {
	ID         uuid.UUID `json:"id"`
	HabitID    uuid.UUID `json:"habit_id"`
	Date       string    `json:"date"`
	Completed  bool      `json:"completed"`
	CreatedAt  time.Time `json:"created_at"`
	ModifiedAt time.Time `json:"modified_at"`
}

type createHabitEntryRequest struct {
	HabitId   uuid.UUID `json:"habit_id" binding:"required"`
	Date      string    `json:"date" binding:"required"`
	Completed bool      `json:"completed"`
}

func (server *Server) createHabitEntry(ctx *gin.Context) {
	var req createHabitEntryRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	parsedDate, err := time.Parse("2006-01-02", req.Date)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(errors.New("wrong date format, use YYYY-MM-DD")))
		return
	}

	arg := db.CreateHabitEntryParams{
		ID:        uuid.New(),
		HabitID:   req.HabitId,
		Date:      parsedDate,
		Completed: req.Completed,
	}

	habitEntry, err := server.store.CreateHabitEntry(ctx, arg)
	if err != nil {
		if db.ErrorCode(err) == db.ForeignKeyViolation {
			ctx.JSON(http.StatusBadRequest, errorResponse(errors.New("habit not found")))
			return
		}

		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	response := habitEntryResponse{
		ID:         habitEntry.ID,
		HabitID:    habitEntry.HabitID,
		Date:       habitEntry.Date.AddDate(0, 0, 1).Format("2006-01-02"),
		Completed:  habitEntry.Completed,
		CreatedAt:  habitEntry.CreatedAt,
		ModifiedAt: habitEntry.ModifiedAt,
	}

	ctx.JSON(http.StatusOK, response)
}

func (server *Server) listHabitEntries(ctx *gin.Context) {
	habitEntries, err := server.store.ListHabitEntries(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	var response []habitEntryResponse

	for _, entry := range habitEntries {
		response = append(response, habitEntryResponse{
			ID:         entry.ID,
			HabitID:    entry.HabitID,
			Date:       entry.Date.AddDate(0, 0, 1).Format("2006-01-02"),
			Completed:  entry.Completed,
			CreatedAt:  entry.CreatedAt,
			ModifiedAt: entry.ModifiedAt,
		})
	}

	ctx.JSON(http.StatusOK, response)
}

type getHabitEntriesRequest struct {
	ID string `uri:"id" binding:"required"`
}

func (server *Server) getHabitEntry(ctx *gin.Context) {
	var req getHabitEntriesRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	id, err := uuid.Parse(req.ID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(errors.New("invalid UUID format")))
		return
	}

	habitEntry, err := server.store.GetHabitEntry(ctx, id)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, errorResponse(errors.New("habit entry not found")))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	response := habitEntryResponse{
		ID:         habitEntry.ID,
		HabitID:    habitEntry.HabitID,
		Date:       habitEntry.Date.AddDate(0, 0, 1).Format("2006-01-02"),
		Completed:  habitEntry.Completed,
		CreatedAt:  habitEntry.CreatedAt,
		ModifiedAt: habitEntry.ModifiedAt,
	}

	ctx.JSON(http.StatusOK, response)
}

type updateHabitEntryRequest struct {
	ID        uuid.UUID `json:"id" binding:"required"`
	Date      string    `json:"date"`
	Completed *bool     `json:"completed"`
}

func (server *Server) updateHabitEntry(ctx *gin.Context) {
	var req updateHabitEntryRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.UpdateHabitEntryParams{
		ID: req.ID,
		ModifiedAt: pgtype.Timestamptz{
			Time:  time.Now(),
			Valid: true,
		},
	}

	if req.Date != "" {
		parsedDate, err := time.Parse("2006-01-02", req.Date)

		if err != nil {
			ctx.JSON(http.StatusBadRequest, errorResponse(errors.New("formato de fecha inválido, usar YYYY-MM-DD")))
			return
		}

		arg.Date = pgtype.Timestamptz{
			Time:  parsedDate,
			Valid: true,
		}
	}

	if req.Completed != nil {
		arg.Completed = pgtype.Bool{
			Bool:  *req.Completed,
			Valid: true,
		}
	}

	habitEntry, err := server.store.UpdateHabitEntry(ctx, arg)
	if err != nil {
		if db.ErrorCode(err) == db.ForeignKeyViolation {
			ctx.JSON(http.StatusBadRequest, errorResponse(errors.New("habit not found")))
			return
		}

		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, errorResponse(errors.New("habit entry not found")))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	response := habitEntryResponse{
		ID:         habitEntry.ID,
		HabitID:    habitEntry.HabitID,
		Date:       habitEntry.Date.AddDate(0, 0, 1).Format("2006-01-02"),
		Completed:  habitEntry.Completed,
		CreatedAt:  habitEntry.CreatedAt,
		ModifiedAt: habitEntry.ModifiedAt,
	}

	ctx.JSON(http.StatusOK, response)
}
