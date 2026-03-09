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

type createColumnRequest struct {
	BoardId  uuid.UUID `json:"board_id" binding:"required"`
	Name     string    `json:"name" binding:"required"`
	Position int32     `json:"position" binding:"required,min=1"`
}

func (server *Server) createColumn(ctx *gin.Context) {
	var req createColumnRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.CreateColumnParams{
		ID:       uuid.New(),
		BoardID:  req.BoardId,
		Name:     req.Name,
		Position: req.Position,
	}

	column, err := server.store.CreateColumn(ctx, arg)
	if err != nil {
		if db.ErrorCode(err) == db.UniqueViolation {
			ctx.JSON(http.StatusBadRequest, errorResponse(errors.New(`a column already exists at sent position`)))
			return
		}

		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, column)
}

type listColumnsByBoardRequest struct {
	BoardId string `uri:"id" binding:"required"`
}

func (server *Server) listColumnsByBoard(ctx *gin.Context) {
	var req listColumnsByBoardRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	id, err := uuid.Parse(req.BoardId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(errors.New("invalid UUID format")))
		return
	}

	column, err := server.store.ListColumnsByBoard(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, column)
}

type getColumnRequest struct {
	ID string `uri:"id" binding:"required"`
}

func (server *Server) getColumn(ctx *gin.Context) {
	var req getColumnRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	id, err := uuid.Parse(req.ID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(errors.New("invalid UUID format")))
		return
	}

	column, err := server.store.GetColumn(ctx, id)
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

type updateColumnRequest struct {
	ID       uuid.UUID `json:"id" binding:"required"`
	Name     string    `json:"name"`
	Position int32     `json:"position"`
}

func (server *Server) updateColumn(ctx *gin.Context) {
	var req updateColumnRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.UpdateColumnParams{
		ID: req.ID,
		Name: pgtype.Text{
			String: req.Name,
			Valid:  req.Name != "",
		},
		Position: pgtype.Int4{
			Int32: req.Position,
			Valid: req.Position > 0,
		},
		ModifiedAt: pgtype.Timestamptz{
			Time:  time.Now(),
			Valid: true,
		},
	}

	column, err := server.store.UpdateColumn(ctx, arg)
	if err != nil {
		if db.ErrorCode(err) == db.UniqueViolation {
			ctx.JSON(http.StatusBadRequest, errorResponse(errors.New(`a column already exists at sent position`)))
			return
		}

		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, errorResponse(errors.New("column not found")))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, column)
}
