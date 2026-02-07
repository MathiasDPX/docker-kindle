const API_URL = 'http://caterpillar:8080'

let params = new URLSearchParams(document.location.search);
logs = document.getElementById('logs');
container_name = document.getElementById('container-name');

async function loadLogs() {
    try {
        id = params.get('id')
        if (id == null) {
            logs.innerHTML = `Unable to load logs<br><br>'id' parameter not found`;
            return
        }
        const response = await fetch(`${API_URL}/logs/${id}`, { cache: 'no-store' })
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
        }
        const data = await response.json()

        logs.innerText = data['logs']
        container_name.innerText = data['container']
    } catch (err) {
        logs.innerHTML = `Unable to load logs<br><br>${err}`;
    }
}

loadLogs()