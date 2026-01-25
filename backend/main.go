package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Index(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

func main() {
	r := gin.Default()

	r.GET("/", Index)

	r.Run()
}
