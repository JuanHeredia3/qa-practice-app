package api

import (
	"errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	db "github.com/qa-practice-project/db/sqlc"
	"github.com/qa-practice-project/token"
)

type createTrackerRequest struct {
	Name string `json:"name" binding:"required"`
}

func (server *Server) createTracker(ctx *gin.Context) {
	var req createTrackerRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	arg := db.CreateTrackerParams{
		ID:       uuid.New(),
		Username: authPayload.Username,
		Name:     req.Name,
	}

	tracker, err := server.store.CreateTracker(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, tracker)
}

func (server *Server) listTrackers(ctx *gin.Context) {
	tracker, err := server.store.ListTrackers(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, tracker)
}

type getTrackerRequest struct {
	ID string `uri:"id" binding:"required"`
}

func (server *Server) getTracker(ctx *gin.Context) {
	var req getTrackerRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	id, err := uuid.Parse(req.ID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(errors.New("invalid UUID format")))
		return
	}

	tracker, err := server.store.GetTracker(ctx, id)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, errorResponse(errors.New("tracker not found")))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, tracker)
}

type updateTrackerRequest struct {
	ID   uuid.UUID `json:"id" binding:"required"`
	Name string    `json:"name"`
}

func (server *Server) updateTracker(ctx *gin.Context) {
	var req updateTrackerRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.UpdateTrackerParams{
		ID: req.ID,
		Name: pgtype.Text{
			String: req.Name,
			Valid:  true,
		},
		ModifiedAt: pgtype.Timestamptz{
			Time:  time.Now(),
			Valid: true,
		},
	}

	tracker, err := server.store.UpdateTracker(ctx, arg)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, errorResponse(errors.New("tracker not found")))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, tracker)
}
