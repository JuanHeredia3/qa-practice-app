package api

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/qa-practice-project/token"
)

const (
	authorizationHeaderKey  = "Authorization"
	authorizationTypeBearer = "Bearer"
	authorizationPayloadKey = "authorization_payload"
)

func authMiddleware(token token.Maker) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authorizationHeader := ctx.GetHeader(authorizationHeaderKey)
		if len(authorizationHeader) == 0 {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(fmt.Errorf("authorization header is not provided")))
			return
		}

		fields := strings.Fields(authorizationHeader)
		if len(fields) < 2 {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(fmt.Errorf("invalid authorization header format")))
			return
		}

		accessType := fields[0]
		if accessType != authorizationTypeBearer {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(fmt.Errorf("unsupported authorization type")))
			return
		}

		accessToken := fields[1]
		payload, err := token.VerifyToken(accessToken)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		ctx.Set(authorizationPayloadKey, payload)
		ctx.Next()
	}
}
