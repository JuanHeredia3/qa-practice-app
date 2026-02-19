package api

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	db "github.com/qa-practice-project/db/sqlc"
	"github.com/qa-practice-project/token"
	"github.com/qa-practice-project/util"
)

type Server struct {
	config     util.Config
	store      db.Store
	tokenMaker token.Maker
	router     *gin.Engine
}

func NewServer(config util.Config, store db.Store) (*Server, error) {
	tokenMaker, err := token.NewPasetoMaker(config.TokenSymmetricKey)
	if err != nil {
		return nil, err
	}

	server := &Server{
		config:     config,
		tokenMaker: tokenMaker,
		store:      store,
	}

	server.setUpRouter()
	return server, nil
}

func (server *Server) setUpRouter() {
	router := gin.Default()

	router.Use(cors.Default())

	router.POST("/users", server.createUser)
	router.POST("/users/login", server.loginUser)
	router.POST("/tokens/renew_access", server.renewAccessToken)

	authRoutes := router.Group("/").Use(authMiddleware(server.tokenMaker))

	authRoutes.GET("/trackers/:id", server.getTracker)
	authRoutes.GET("/trackers", server.listTrackers)
	authRoutes.POST("/trackers", server.createTracker)
	authRoutes.PUT("/trackers", server.updateTracker)

	server.router = router
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}
