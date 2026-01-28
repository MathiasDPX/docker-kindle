package main

import (
	"image"
	"image/color"
	"time"

	"github.com/aarzilli/nucular"
	"github.com/aarzilli/nucular/style"
)

var wnd nucular.MasterWindow

func main() {
	wnd = nucular.NewMasterWindowSize(0, "L:A_N:fr.mathiasd.kdocker:app", image.Pt(768, 1024-24), updatefn)
	wnd.SetStyle(style.FromTheme(style.WhiteTheme, 2))
	go clear(wnd)
	wnd.Main()
}

func updatefn(w *nucular.Window) {
	w.Row(40).Dynamic(1)
	w.LabelColored("kDocker", "CC", color.RGBA{0, 0, 0, 255})

	w.Row(15).Dynamic(2)
	w.Label("Prometheus", "LC")
	w.Label("Running", "RC")

	w.Row(10).Dynamic(1)
	w.Label("Up for 5 months", "LC")
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
