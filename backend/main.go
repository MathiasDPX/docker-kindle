package main

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/moby/moby/client"
)

func main() {
	cli, err := client.New(
		client.FromEnv,
	)

	if err != nil {
		panic(err)
	}

	r := gin.Default()

	r.GET("/", func(ctx *gin.Context) {
		containers, err := cli.ContainerList(context.Background(), client.ContainerListOptions{
			All: true,
		})

		if err != nil {
			panic(err)
		}

		result := []gin.H{}
		for _, c := range containers.Items {
			result = append(result, gin.H{
				"id":     c.ID[:12],
				"name":   c.Names[0][1:],
				"state":  c.State,
				"status": c.Status,
			})
		}

		ctx.JSON(http.StatusOK, result)
	})

	r.Run()
}
