// let p = fetch(`${url}${query}&apiKey=${API_KEY}`);
// p.then((response) => response.json())
// .then((data) => console.log(data));

const API_KEY = "73214130c4b94a44b3229917cad156fa";
const url = "https://newsapi.org/v2/everything?q=";
// let query = "Virat Kohli";

const fetchNews = async (query) => {
    let response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    let data = await response.json();
    bindData(data.articles);
}

const bindData = (article) => {
    // console.log(article);
    let cardContainer = document.getElementById('card-container');
    
    let cardHtml = ``;

    for (item in article) {
        if (!article[item].urlToImage) continue;

        let date = new Date(article[item].publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta",
        });

        cardHtml += `

            <div class="card">
            
                <img src="${article[item].urlToImage}" class="card-img-top" alt="...">

                <div class="card-body">

                    <h5 class="card-title">${article[item].title}</h5>

                    <p class="source-and-time">${article[item].source.name} | ${date}</p>

                    <p class="card-text">${article[item].content}</p>

                    <a href="${article[item].url}" class="btn btn-primary" target="_blank">Read More</a>

                </div>
        
            </div>
        `;

    }
    cardContainer.innerHTML = cardHtml;

}

// Getting Query Values 
// 1. From Navbar Links 
const navLinkClick = (value) => fetchNews(value);

// 2. Search Bar 

// let searchBtn = document.getElementById('search-btn');

let searchClick = () => {
    let searchBar = document.getElementById('search-bar');
    let data = searchBar.value;
    fetchNews(data);
    searchBar.innerText = "";
}

// 3. On Window Loading 
window.addEventListener('load', fetchNews('General'));
