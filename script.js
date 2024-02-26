//api access key

const accessKey = "d_HZZoV_coau63GqX4g2YiXUyhXo-tJB-YmlhodPuOo";

//Basic Elements Selection

const formEl = document.querySelector("form");
const inputSearchEl = document.querySelector("#input_search");
const rowEl = document.querySelector(".row");
const details_1 = document.querySelector(".details_1");
const details_2 = document.querySelector(".details_2");
const details_3 = document.querySelector(".details_3");

let inputData = "";
let page = 1;

async function imagesSearch() {
    inputData = inputSearchEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    if(page === 1) {
        details_1.innerHTML = "";
        details_2.innerHTML = "";
        details_3.innerHTML = "";
    }

    const results = data.results;

    console.log(results);

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("img");
        
        const imgEl = document.createElement("img");
        imgEl.src = result.urls.small;
        imgEl.alt = result.alt_description;
    
        const descriptionEl = document.createElement("div");
        descriptionEl.classList.add("description");
    
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
    
        imageWrapper.appendChild(imgEl);
        descriptionEl.appendChild(imageLink);
    
        // Append elements to their respective parents
        details_1.appendChild(imageWrapper.cloneNode(true));
        details_1.appendChild(descriptionEl.cloneNode(true));
    
        details_2.appendChild(imageWrapper.cloneNode(true));
        details_2.appendChild(descriptionEl.cloneNode(true));
    
        details_3.appendChild(imageWrapper.cloneNode(true));
        details_3.appendChild(descriptionEl.cloneNode(true));
    });
    
    page++;
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    imagesSearch();
})