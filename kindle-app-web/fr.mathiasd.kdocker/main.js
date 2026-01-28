const API_URL = 'http://caterpillar:8080'

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

    containersList.appendChild(containerElem)
}

async function loadContainers() {
    containers.innerHTML = '';
    containersList = document.createElement('ul')
    containers.appendChild(containersList)
    
    try {
        const response = await fetch(`${API_URL}/`, { cache: 'no-store' })
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
        }
        const items = await response.json()
        items.forEach(createContainer)
    } catch (err) {
        containers.innerHTML = '<span id="error">Failed to load containers</span>';
    }
}

loadContainers()

if (!navigator.userAgent.includes("Kindle") && !navigator.userAgent.includes("Silk")) {
    document.body.style.height = "800px"
    document.body.style.width = "480px"
    document.body.style.border = "2px solid #333"
    document.body.style.margin = "1em"

    // todo: add github link under body (visible cuz we're not on kindle)
}