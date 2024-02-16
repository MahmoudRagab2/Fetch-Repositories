let inp = document.querySelector('[placeholder="username"]');
let btn = document.querySelector(".get-btn");
let reposContent = document.querySelector(".repos-content");
let loading = document.querySelector(".loading");
document.onkeydown = function () {
  inp.focus();
};

btn.onclick = function () {
  if (inp.value != "") {
    reposContent.innerHTML = "";
    loading.style.display = "block";
    fetchApi(`https://api.github.com/users/${inp.value}/repos`);
  }
};

function fetchApi(link) {
  fetch(link)
    .then((resolve) => {
      return resolve.json();
    })
    .then((data) => {
      if (data.message != "Not Found") {
        if (data.length == 0) {
          reposContent.innerHTML = `<h2>No Found Repositories For Show</h2>`;
          loading.style.display = "none";
        } else {
          for (let i = 0; i < data.length; i++) {
            let mainDiv = document.createElement("div");
            mainDiv.className = "repo";

            let titleRepo = document.createElement("div");
            titleRepo.className = "title-repo";

            let count = document.createElement("span");
            count.className = "name-number";
            count.appendChild(document.createTextNode(i + 1));

            let title = document.createElement("h2");
            title.appendChild(document.createTextNode(data[i].name));

            let repodetails = document.createElement("div");
            repodetails.className = "repo-details";

            let stars = document.createElement("span");
            stars.className = "stars";
            stars.appendChild(
              document.createTextNode(`Stars ${data[i].stargazers_count}`)
            );

            let linkRepo = document.createElement("span");
            linkRepo.className = "visit";
            let link = document.createElement("a");
            link.href = data[i].html_url;
            link.target = "_blank";
            link.textContent = "Visit";
            linkRepo.appendChild(link);

            titleRepo.appendChild(count);
            titleRepo.appendChild(title);
            repodetails.appendChild(stars);
            repodetails.appendChild(linkRepo);
            mainDiv.appendChild(titleRepo);
            mainDiv.appendChild(repodetails);
            reposContent.appendChild(mainDiv);
          }
          loading.style.display = "none";
        }
      } else {
        reposContent.innerHTML = `<h2>User Name Is Unkown</h2>`;
        loading.style.display = "none";
      }
    });
}
