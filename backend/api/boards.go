package api

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	db "github.com/qa-practice-project/db/sqlc"
)

type createBoardRequest struct {
	TrackerID uuid.UUID `json:"tracker_id" binding:"required"`
}

func (server *Server) createBoard(ctx *gin.Context) {
	var req createBoardRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.CreateBoardParams{
		ID:        uuid.New(),
		TrackerID: req.TrackerID,
	}

	board, err := server.store.CreateBoard(ctx, arg)
	if err != nil {
		if db.ErrorCode(err) == db.ForeignKeyViolation {
			ctx.JSON(http.StatusBadRequest, errorResponse(errors.New("board not exists")))
			return
		}

		if db.ErrorCode(err) == db.UniqueViolation {
			ctx.JSON(http.StatusBadRequest, errorResponse(errors.New("board already exists for the given tracker")))
			return
		}

		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, board)
}

type getBoardRequest struct {
	ID string `uri:"id" binding:"required"`
}

func (server *Server) getBoard(ctx *gin.Context) {
	var req getBoardRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	id, err := uuid.Parse(req.ID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(errors.New("invalid UUID format")))
		return
	}

	board, err := server.store.GetBoard(ctx, id)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, errorResponse(errors.New("board not found")))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, board)
}

type getBoardByTrackerIdRequest struct {
	ID string `uri:"id" binding:"required"`
}

func (server *Server) getBoardByTracker(ctx *gin.Context) {
	var req getBoardByTrackerIdRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	id, err := uuid.Parse(req.ID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(errors.New("invalid UUID format")))
		return
	}

	board, err := server.store.GetBoardByTrackerId(ctx, id)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, errorResponse(errors.New("board not found")))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, board)
}
