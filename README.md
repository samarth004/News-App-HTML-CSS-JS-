# News-App-HTML-CSS-JS-
-----HTML--------
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="/assests/Screenshot 2024-02-29 140028.png" type="image/x-icon">
  <title>All Time News</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

   <nav>
      <div class="main-nav container flex">
       
        <a href="" onclick="reload()" class="company-logo">
          <img src="./assests/Screenshot 2024-02-29 140028.png" alt="logo">
        </a>

          <div class="nav-links">
            <ul class="flex">
              <li class="hover-link nav-item" id="IPL" onclick="onNavItemClick('ipl')">IPL</li>
              <li class="hover-link nav-item" id="finance" onclick="onNavItemClick('finance')">Finanace</li>
              <li class="hover-link nav-item" id="Politics" onclick="onNavItemClick('Politics')">Politics</li>
            </ul>
          </div>

          <div class="search-bar flex">
            <input type="text" class="news-input" id="news-input" placeholder="e.g. science">
            <button class="search-button" id="search-button">Search</button>
          </div>
      </div>
    
   </nav>


   
   <main>
     <div class="card-container container flex" id="card-container">
       
     </div>
   </main>

   <template id="template-news-card">
      <div class="card">
       <div class="card-header">
         <img src="https://via.placeholder.com/400x200" alt="./assests/assests/Screenshot 2024-02-29 140028.png" id="news-img">
       </div>
       <div class="card-content">
          <h3 id="news-title">This is the title</h3>
          <h6 class="news-source" id="new-source">End gadget</h6>
          <p class="news-dec" id="news-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, explicabo voluptates. Neque debitis corporis exercitationem ipsam at, repudiandae inventore nam.</p>
       </div>
    </div>
   </template>
  
  <script src="script.js"></script>
</body>
</html>





---------CSS---------------
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap');


*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  font-family:"Poppins",sans-serif;
  color: var(--primary-text-color);
}

:root{
  --primary-text-color:#183b56;
  --secondary-text-color: #577592;
  --accent-color: #2294ed;
  --accent-color-dark: #1d69a3;

}


p{
  font-family: "Roboto",sans-serif;
  color: var(--secondary-text-color);
  line-height: 1.4rem;
}

a{
  text-decoration: none;
}

ul{
  list-style: none;
}

.flex{
  display: flex;
  align-items: center;
}

.container{
  max-width: 1180px;
  margin-inline: auto;
  overflow: hidden;
}

nav{
  
  background-color:#f3faff; 
  box-shadow: 0 0 4px #bbd8e2;
  position: fixed;
  top: 0;
  z-index: 99;
  left:0 ;
  right:0 ;
}

.main-nav{
  justify-content: space-between;
  padding-block: 8px;

}

.company-logo img{
  width: 120px;
  

}

.nav-links ul{
 gap: 16px;

}

.hover-link{
  cursor: pointer;
}

.hover-link:hover{
  color: var(--secondary-text-color);
}

.hover-link:active{
  color: red;
}

.search-bar{
  height: 32px;
  gap: 8px;
}

.news-input{
   width: 200px;
   height: 100%;
   padding-inline: 12px ;
   border-radius: 4px;
   border: 2px solid #bbd8e2;
   font-family: "Roboto",sans-serif;
}

.search-button{
  background-color: var(--accent-color);
  color: white;
  padding: 8px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Roboto",sans-serif;

}

.search-button:hover{
  background-color: var(--accent-color-dark);
}

main{
  padding-block:20px ;
  margin-top: 106px;
}

.card-container{
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 20px;
  align-items: start;
}

.card{
  width: 350px;
  min-height: 400px;
  box-shadow: 0 0 4px #d4ecff;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  overflow: hidden;
  transform: all 0.3s ease ;
}

.card:hover{
  box-shadow: 1px 1px 1px #d4ecff ;
  background-color: #f9fdff ;
  transform: translateY(-2px);

}

.card-header img{
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-content{
  padding: 12px;

}

.news-source{
  margin-block: 12px;
}


-------JS---------
onst API_KEY = "a67eb0eef8434698852960df69458c23";
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
