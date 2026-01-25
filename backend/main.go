package main

import (
	"context"
	"math"
	"net/http"
	"os"
	"sort"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/goccy/go-yaml"
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

type ContainerConfig struct {
	Container string `yaml:"-"`
	Name      string `yaml:"name"`
	Icon      string `yaml:"icon"`
}

func LoadConfig(path string) (map[string]ContainerConfig, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	raw := make(map[string]ContainerConfig)
	if err := yaml.Unmarshal(data, &raw); err != nil {
		return nil, err
	}

	for key, cfg := range raw {
		cfg.Container = key
		raw[key] = cfg
	}

	return raw, nil
}

func main() {
	cli, err := client.New(
		client.FromEnv,
	)

	if err != nil {
		panic(err)
	}

	configs, err := LoadConfig("config.yml")
	if err != nil {
		configs = make(map[string]ContainerConfig)
	}

	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Content-Type", "Authorization"}
	config.ExposeHeaders = []string{"Content-Length"}
	r.Use(cors.New(config))

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
			cfg := configs[c.Names[0][1:]]
			item := gin.H{
				"id":     c.ID[:12],
				"name":   c.Names[0][1:],
				"state":  c.State,
				"status": c.Status,
				"image":  c.Image,
			}

			if cfg.Name != "" {
				item["displayName"] = cfg.Name
			}

			if cfg.Icon != "" {
				item["icon"] = cfg.Icon
			}

			result = append(result, item)
		}

		ctx.JSON(http.StatusOK, result)
	})

	r.Run()
}
