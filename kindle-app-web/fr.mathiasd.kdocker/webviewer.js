if (!(navigator.userAgent.includes("Kindle") || navigator.userAgent.includes("Silk"))) {
    document.body.style.height = "800px"
    document.body.style.width = "480px"
    document.body.style.border = "2px solid #333"
    document.body.style.margin = "1em"

    repo = document.createElement("a");
    repo.href = "https://github.com/MathiasDPX/docker-kindle";
    repo.innerText = "MathiasDPX/docker-kindle";

    repo.style['text-align'] = "center";
    repo.style['width'] = "100%";
    repo.style['display'] = "block";
    repo.style['padding-top'] = "1.5em";
    repo.style['color'] = "#0D65EF";
    repo.style['text-decoration'] = "underline";

    document.body.insertAdjacentElement("beforeend", repo)
}