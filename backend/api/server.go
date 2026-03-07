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

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{server.config.FrontendURL},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	router.POST("/users", server.createUser)
	router.POST("/users/login", server.loginUser)
	router.POST("/tokens/renew_access", server.renewAccessToken)

	authRoutes := router.Group("/").Use(authMiddleware(server.tokenMaker))

	authRoutes.GET("/trackers/:id", server.getTracker)
	authRoutes.GET("/trackers", server.listTrackers)
	authRoutes.POST("/trackers", server.createTracker)
	authRoutes.PUT("/trackers", server.updateTracker)
	authRoutes.GET("/trackers/board/:id", server.getBoardByTracker)
	authRoutes.GET("/trackers/habits/:id", server.listHabitsByTracker)

	authRoutes.POST("/boards", server.createBoard)
	authRoutes.GET("/boards/:id", server.getBoard)
	authRoutes.GET("/boards/columns/:id", server.listColumnsByBoard)

	authRoutes.GET("/columns/:id", server.getColumn)
	authRoutes.POST("/columns", server.createColumn)
	authRoutes.PUT("/columns", server.updateColumn)
	authRoutes.GET("/columns/habits/:id", server.listHabitsByColumn)

	authRoutes.POST("/habits", server.createHabit)
	authRoutes.GET("/habits/:id", server.getHabit)
	authRoutes.GET("/habits", server.listHabits)
	authRoutes.PUT("/habits", server.updateHabit)

	authRoutes.POST("/habit-entries", server.createHabitEntry)
	authRoutes.GET("/habit-entries/:id", server.getHabitEntry)
	authRoutes.GET("/habit-entries", server.listHabitEntries)
	authRoutes.PUT("/habit-entries", server.updateHabitEntry)

	server.router = router
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}
