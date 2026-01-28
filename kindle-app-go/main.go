package main

import (
	"encoding/json"
	"fmt"
	"image"
	"image/color"
	"net/http"
	"time"

	"github.com/aarzilli/nucular"
	"github.com/aarzilli/nucular/style"
)

var wnd nucular.MasterWindow
var containers []Container
var errorMsg string

var API_URL string

func main() {
	wnd = nucular.NewMasterWindowSize(0, "L:A_N:fr.mathiasd.kdocker:app", image.Pt(768, 1024-24), updatefn)
	wnd.SetStyle(style.FromTheme(style.WhiteTheme, 2))

	// dev env
	if API_URL == "" {
		API_URL = "http://localhost:8080"
	}

	go func() {
		for {
			time.Sleep(5 * time.Second)
			loadContainers()
		}
	}()

	go clear(wnd)

	wnd.Main()
}

type Container struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	DisplayName string `json:"displayName"`
	State       string `json:"state"`
	Status      string `json:"status"`
	Image       string `json:"image"`
	Icon        string `json:"icon"`
}

func loadContainers() {
	client := &http.Client{Timeout: 5 * time.Second}
	resp, err := client.Get(API_URL + "/")
	if err != nil {
		errorMsg = "Failed to load containers"
		wnd.Changed()
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		errorMsg = fmt.Sprintf("HTTP %d", resp.StatusCode)
		wnd.Changed()
		return
	}

	var newContainers []Container
	if err := json.NewDecoder(resp.Body).Decode(&newContainers); err != nil {
		errorMsg = "Failed to decode API response"
		wnd.Changed()
		return
	}

	errorMsg = ""
	containers = newContainers
	wnd.Changed()
}

func updatefn(w *nucular.Window) {
	w.Row(40).Dynamic(1)
	w.Label("kDocker", "CC")

	if errorMsg != "" {
		w.Row(100).Dynamic(1)
		w.Label(errorMsg, "CC")
		return
	}

	if len(containers) == 0 {
		w.Row(100).Dynamic(1)
		w.Label("Loading...", "CC")
		return
	}

	for i, container := range containers {
		if i%2 == 1 {
			bounds := w.WidgetBounds()
			bounds.H = 80
			bounds.Y -= 7
			w.Commands().FillRect(bounds, 0, color.RGBA{150, 150, 150, 255})
		}

		w.Row(15).Dynamic(2)

		displayName := container.Name
		if container.DisplayName != "" {
			displayName = container.DisplayName
		}
		w.Label(displayName, "LC")
		w.Label(container.Status, "RC")

		w.Row(10).Dynamic(1)
		w.Label(container.State, "LC")

		// Gap between containers
		w.Row(5).Dynamic(1)
		w.Spacing(1)
	}
}

// hack to flash the buffer dark to clear ghosting
func clear(w nucular.MasterWindow) {
	originalTheme := *w.Style()
	time.Sleep(1000 * time.Millisecond)
	w.SetStyle(style.FromTheme(style.DarkTheme, 0))
	w.Changed()
	time.Sleep(200 * time.Millisecond)
	w.SetStyle(&originalTheme)
	w.Changed()
}
