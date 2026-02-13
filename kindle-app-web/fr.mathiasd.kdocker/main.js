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

function loadContainers() {
    containers.innerHTML = '';
    containersList = document.createElement('ul')
    containers.appendChild(containersList)
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/`, true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const items = JSON.parse(xhr.responseText);
                items.forEach(createContainer);
            } catch (err) {
                containers.innerHTML = '<span id="error">Failed to parse response</span>';
                console.error('Error parsing response:', err);
            }
        } else {
            containers.innerHTML = '<span id="error">Failed to load containers: HTTP ' + xhr.status + '</span>';
        }
    };
    
    xhr.onerror = function() {
        containers.innerHTML = '<span id="error">Failed to load containers: Network error</span>';
        console.error('Network error');
    };
    
    xhr.send();
}

loadContainers()
document.addEventListener('DOMContentLoaded', function() {
    setInterval(function() {
        loadContainers()
    }, CONFIG.REFRESH_RATE * 60 * 1000) // every X minutes
})