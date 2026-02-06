const API_URL = 'http://caterpillar:8080'

let params = new URLSearchParams(document.location.search);
logs = document.getElementById('logs')

async function loadLogs() {
    try {
        const response = await fetch(`${API_URL}/logs/${params.get('id')}`, { cache: 'no-store' })
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
        }
        const data = await response.json()
        logs.innerText = data['logs']
    } catch (err) {
        containers.innerHTML = 'Unable to load logs';
    }
}

loadLogs()