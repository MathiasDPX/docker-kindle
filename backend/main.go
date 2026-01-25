package main

import (
	"context"
	"math"
	"net/http"
	"sort"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/moby/moby/api/types/container"
	"github.com/moby/moby/client"
)

// Weight in the sort
var RANKS = map[string]int{
	"dead":       0,
	"exited":     1,
	"paused":     2,
	"restarting": 3,
	"running":    4,
	"created":    5,
}

func rank(state container.ContainerState) int {
	s := strings.ToLower(string(state))

	if r, ok := RANKS[s]; ok {
		return r
	}
	return math.MaxInt
}

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

		sort.Slice(containers.Items, func(i, j int) bool {
			return rank(containers.Items[i].State) < rank(containers.Items[j].State)
		})

		result := []gin.H{}
		for _, c := range containers.Items {
			result = append(result, gin.H{
				"id":     c.ID[:12],
				"name":   c.Names[0][1:],
				"state":  c.State,
				"status": c.Status,
				"image":  c.Image,
			})
		}

		ctx.JSON(http.StatusOK, result)
	})

	r.Run()
}
