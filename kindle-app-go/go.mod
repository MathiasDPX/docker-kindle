module github.com/MathiasDPX/docker-kindle

go 1.25

require github.com/aarzilli/nucular v0.0.0-20210223105526-e916ed44236d

require (
	dmitri.shuralyov.com/gpu/mtl v0.0.0-20221208032759-85de2813cf6b // indirect
	gioui.org v0.0.0-20230404150518-c0d3f67b0468 // indirect
	gioui.org/cpu v0.0.0-20210817075930-8d6a761490d2 // indirect
	gioui.org/shader v1.0.6 // indirect
	github.com/BurntSushi/xgb v0.0.0-20160522181843-27f122750802 // indirect
	github.com/go-gl/glfw/v3.3/glfw v0.0.0-20231223183121-56fa3ac82ce7 // indirect
	github.com/go-text/typesetting v0.0.0-20230329143336-a38d00edd832 // indirect
	github.com/golang/freetype v0.0.0-20161208064710-d9be45aaf745 // indirect
	github.com/hashicorp/golang-lru v0.5.1 // indirect
	golang.org/x/exp v0.0.0-20221012211006-4de253d81b95 // indirect
	golang.org/x/exp/shiny v0.0.0-20251125195548-87e1e737ad39 // indirect
	golang.org/x/image v0.35.0 // indirect
	golang.org/x/mobile v0.0.0-20251209145715-2553ed8ce294 // indirect
	golang.org/x/sys v0.40.0 // indirect
	golang.org/x/text v0.33.0 // indirect
)

replace golang.org/x/exp/shiny v0.0.0-20251125195548-87e1e737ad39 => github.com/phthallo/shiny-exp/shiny v0.0.0-20260127203914-ab89db390392

replace golang.org/x/exp/shiny v0.0.0-20220827204233-334a2380cb91 => github.com/phthallo/shiny-exp/shiny v0.0.0-20260127203914-ab89db390392