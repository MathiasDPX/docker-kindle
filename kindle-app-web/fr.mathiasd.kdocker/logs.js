const API_URL = CONFIG.API_URL;

let params = new URLSearchParams(document.location.search);
logs = document.getElementById('logs');
container_name = document.getElementById('container-name');

function loadLogs() {
    id = params.get('id')
    if (id == null) {
        logs.innerHTML = `Unable to load logs<br><br>'id' parameter not found`;
        return
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/logs/${id}`, true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                logs.innerText = data['logs'];
                container_name.innerText = data['container'];
            } catch (err) {
                logs.innerHTML = `Unable to load logs<br><br>Failed to parse response`;
                console.error('Error parsing response:', err);
            }
        } else {
            logs.innerHTML = `Unable to load logs<br><br>HTTP ${xhr.status}`;
        }
    };
    
    xhr.onerror = function() {
        logs.innerHTML = `Unable to load logs<br><br>Network error`;
        console.error('Network error');
    };
    
    xhr.send();
}

loadLogs()
document.addEventListener('DOMContentLoaded', function() {
    setInterval(function() {
        loadLogs()
    }, CONFIG.REFRESH_RATE * 60 * 1000) // every X minutes
})