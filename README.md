# kDocker

Application to monitor Docker containers on your Kindle, allowing you to monitor in real-time the status of your Docker containers directly from your Kindle screen.

kDocker is composed of three modules:
- **Backend**: Go API that handles Docker container monitoring logic
- **Web app**: Mesquito web application (`kindle-app-web`)
- **Golang app**: Compiled Go application (`kindle-app-go`)

On the webapp, you can access logs by clicking on the container name and go back to the main page by clicking on the title (`kDocker`)

## Installation

### 1. Backend

#### Steps


1. Copy the example config:
```bash
cp example-config.yml config.yml
```

2. Edit `config.yml` with your containers (no need to add a entry for each):
```yaml
container_name:
  name: "Display Name"
  icon: '<svg/></svg>'  # svg icon
  hide: false           # true to hide this container
```

3. Start the backend with Docker compose:
```bash
docker-compose up -d
```

The backend starts on port **4110** by default.

### 2. App

You have two options to install the client application:

#### Web Application (Mesquito)

The web application offers a better user experience with complete interface and logs functionality.
You first need to change the API_URL in `config.js`

_and then install it to your kindle but idk how cuz i dont have a kindle yet_

#### Go Application (Binary)

The golang version is located in `kindle-app-go`. You need to specify the API_URL in the build command


```bash
go mod tidy
go build -o docker-kindle -ldflags "-X 'main.API_URL=http://YOUR_BACKEND_IP:4110'"
```

**Note**: The Go version does not currently support log display. Use the web version if you need this functionality.

# Development

## Web

You cannot view the `index.html` directly on your browser, otherwise, links to logs won't work. For that you can use http-server from Node.js or Python, be sure to be in `kindle-app-web/fr.mathiasd.fr/`

```bash
npx http-server
# or
python -m http-server
```