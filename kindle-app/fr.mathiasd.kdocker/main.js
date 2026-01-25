containers = document.getElementById('containers')

containerStates = {
    "running": "Running"
}

function createContainer(data) {
    containerElem = document.createElement('li')

    titleElem = document.createElement('h3')
    titleElem.innerText = data['name']
    containerElem.appendChild(titleElem)

    stateElem = document.createElement('span')
    stateElem.innerText = containerStates[data['state']]
    containerElem.appendChild(stateElem)

    statusElem = document.createElement('small')
    statusElem.innerText = data['status']
    containerElem.appendChild(statusElem)
    containerElem.insertBefore(document.createElement('br'), statusElem)

    containers.appendChild(containerElem)
}

createContainer({
    "id": "a071b35d2313",
    "image": "tailscale/tailscale:stable",
    "name": "tailscale",
    "state": "running",
    "status": "Up 2 weeks"
})

if (!navigator.userAgent.includes("Kindle") && !navigator.userAgent.includes("Silk")) {
    document.body.style.height = "800px"
    document.body.style.width = "480px"
    document.body.style.border = "2px solid #333"
    document.body.style.margin = "1em"

    // todo: add github link under body (visible cuz we're not on kindle)
}