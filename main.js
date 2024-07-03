const videoNameBox = document.getElementById("videoNameBox");
const videoLinkBox = document.getElementById("videoLinkBox");
const videoRateBox = document.getElementById("videoRateBox");
const container = document.getElementById("container");

let videos = [];

function loadFavVids() {
    const json = localStorage.getItem("videos");
    if (!json) return;
    videos = JSON.parse(json);
    displayVideos();
}
function add() {

    if (validate()) {
        const videoId = extractVideoId(videoLinkBox.value);
        const favVid = {
            name: videoNameBox.value,
            link: `https://www.youtube.com/embed/${videoId}`,
            rate: videoRateBox.value
        };
        videos.push(favVid)
        displayVideos()
        console.log(videos)
        saveFavVids()
    }
}

function extractVideoId(url) {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v") || urlObj.pathname.split('/').pop();
}

function displayVideos() {
    if (videos.length === 0) {
        container.innerHTML = ""; return;
    }

    let html = `
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Link</th>
                <th>My Rating</th>
                <th>Remove</th>
            </tr>
        </thead>
        <tbody>
    `;

    for (let i = 0; i < videos.length; i++) {
        html += `
           <tr>
                <td>${videos[i].name}</td>
                <td>
                    <iframe width="560" height="315" src="${videos[i].link}" frameborder="0" allowfullscreen></iframe>
                </td>
                <td>${videos[i].rate}
                </td>
                <td>
                    <button onclick="deleteVideo(${i})"> Remove </button>
                </td>
            </tr>
        `;
    }
    html += "</tbody></table>";
    container.innerHTML = html;
}

function validate() {
    if (!videoNameBox.value) {
        alert("Missing name.");
        videoNameBox.focus();
        return false;
    }
    if (!videoLinkBox.value) {
        alert("Missing animal.");
        videoLinkBox.focus();
        return false;
    }
    const rate = Number(videoRateBox.value);
    if (videoRateBox.value === "" || rate < 1 || rate > 10) {
        alert("Enter a valid rate (1-10).");
        videoRateBox.focus();
        return false;
    }
    return true;
}

function deleteVideo(index) {
    const sure = confirm("Are you sure you want to remove " + videos[index].name + "?");
    if (!sure) return;
    videos.splice(index, 1);
    saveFavVids();
    displayVideos();
}

function saveFavVids() {
    const json = JSON.stringify(videos);
    localStorage.setItem("videos", json);
}

window.onload = function() {
    loadFavVids();
}