const API_KEY = "a67eb0eef8434698852960df69458c23";
const url = "https://newsapi.org/v2/everything?q=";

function reload(){
	window.location.reload();
}

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query){

	const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
	const data = await res.json();
	console.log(data);
	bindData(data.articles);
}

function bindData(articles){
	const cardsContainer = document.getElementById('card-container');
	const newsCardTemplate = document.getElementById('template-news-card');

	cardsContainer.innerHTML = "";

	articles.forEach(article => {
		if(!article.urlToImage)return;

		const cardClone = newsCardTemplate.content.cloneNode(true);
		fillDataInCard(cardClone, article);
		cardsContainer.appendChild(cardClone);
		
	});
}

	
function fillDataInCard(cardClone,article){
	const newsImg = cardClone.querySelector('#news-img');
	const newsTitle = cardClone.querySelector('#news-title');
	const newsSource = cardClone.querySelector('#new-source');
	const newsDesc = cardClone.querySelector('#news-desc');

	newsImg.src = article.urlToImage;
	newsTitle.innerHTML = article.title;
	newsDesc.innerHTML = article.description;

	const date = new Date(article.publishedAt).toLocaleString("en-us",{
		timeZone: "Asia/Jakarta"
	});

	newsSource.innerHTML = `${article.source.name} , ${date} `;

	 cardClone.firstElementChild.addEventListener('click',() => {
		window.open(article.url,"_blank");
	 });
	 
}

function onNavItemClick(id){
	fetchNews(id);
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("news-input");

searchButton.addEventListener('click', () =>{

	const query = searchText.value;
    if(!query)return;
	fetchNews(query);
});