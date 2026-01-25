containers = document.getElementById('containers')

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

function createContainer(data) {
    containerElem = document.createElement('li')

    titleElem = document.createElement('h3')
    titleElem.innerHTML = (data['icon'] || "") + "\n" + (data['displayName'] || data['name'])
    containerElem.appendChild(titleElem)

    stateElem = document.createElement('span')
    stateElem.innerText = capitalize(data['state'])
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
    "status": "Up 2 weeks",
    "displayName": "Tailscale",
    "icon": '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Tailscale</title><path d="M24 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-9 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm0-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6-6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM3 24a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm18 .5a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM6 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm9-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM3 5.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/></svg>'
})

if (!navigator.userAgent.includes("Kindle") && !navigator.userAgent.includes("Silk")) {
    document.body.style.height = "800px"
    document.body.style.width = "480px"
    document.body.style.border = "2px solid #333"
    document.body.style.margin = "1em"

    // todo: add github link under body (visible cuz we're not on kindle)
}