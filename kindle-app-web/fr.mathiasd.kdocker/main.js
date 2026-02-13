containers = document.getElementById('containers')
const API_URL = CONFIG.API_URL;

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

function createContainer(data) {
    containerElem = document.createElement('li')

    titleElem = document.createElement('a')
    titleElem.href = "/logs.html?id=" + data['id']
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

setInterval(function() {
    loadContainers()
}, CONFIG.REFRESH_RATE * 60 * 1000) // every X minutes