const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const superheroDetails = document.getElementById("superheroDetails");
const favoriteContainer=document.getElementById("favContainer");

const apiKeyPublic = "943a74399880af6488cc673a7bf08563";
//const ts=new Date().getTime();
// Function to fetch superhero data

function getLocalStorage() {
  let data = JSON.parse(localStorage.getItem("favourite")) || [];
  return data;
}

async function fetchData() {
  try {
    const response = await fetch(
      "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=943a74399880af6488cc673a7bf08563&hash=3d65031e20be66dbedaad4b88d9aea55"
    );
    const data = await response.json();

    return data;
    // displaySearchResults(res.data.results); //sending the searched results characters to show in HTML
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

fetchData()
  .then((data) => {
    let favoriteData = getLocalStorage();
    let arr = data.data.results;
    heroContainer.innerHTML = "";

    for (let i = 0; i < arr.length; i++) {
      let favorite = "favourite";

      // check character is already favorite or not
      for (let j = 0; j < favoriteData.length; j++) {
        if (arr[i].id == favoriteData[j].id) {
          favorite = "UnFavourite";
          break;
        }
      }

      const { id, thumbnail, name } = arr[i];
      let div = document.createElement("div");
      div.classList.add("col-3");
      div.setAttribute("id", id);

      div.innerHTML = `<a href="characters.html#${id}">
        <div class="card p-2 m-3 align-items-center">
            <div class="card-img img-rounded">
              <img
                src="${thumbnail.path}.${thumbnail.extension}"
                class="img-fluid2"
              />
            </div>
            <h4 class="card-text text-center">${name}</h4>
            <div class="card-footer">
              <button value=${favorite} id=${id} onclick="updateFavorite(this)" data-character='{"id": "${id}", "name": "${name}", "path": "${thumbnail.path}.${thumbnail.extension}"}' class="btn bg-danger text-white">Add to Favourite</button>
            </div>
          </div>
          </a>`;

      heroContainer.appendChild(div);
    }
  })
  .catch((error) => {
    console.error(error);
  });

  function setStorage(data) {
    let dataString = JSON.stringify(data);
    
    localStorage.setItem("favourite", dataString);
    console.log(localStorage);
  }

  
  function updateFavorite(e) {
    let data = JSON.parse(e.getAttribute("data-character"));

   
    let favoriteList = getLocalStorage();
    
    // if character is alrady in favorite list then unfavorite it
    for (let character = 0; character < favoriteList.length; character++) {
      
      if (favoriteList[character].id == data.id) {
        favoriteList.splice(character, 1);
        e.setAttribute("value", "Favourite");
        setStorage(favoriteList);
        return;
      }
    }

    favoriteList.push(data);
    setStorage(favoriteList);
    e.setAttribute("value", "UnFavourite");
  
  }

  function renderFavorite() {
    // get favorite list of characters from local storage
    let myFavoriteList = getLocalStorage();
    if(myFavoriteList.length > 0) {
      favoriteContainer.innerHTML = "";
    }
    // iterate over all the favorite list chracters fetched from local storage
    for (let character = 0; character < myFavoriteList.length; character++) {
      const { id, name, path } = myFavoriteList[character];
  
      let div = document.createElement("div");
    div.classList.add("col-3");
    div.setAttribute("id", id);

    div.innerHTML = `<a href="characters.html#${id}">
      <div class="card p-2 m-3 align-items-center">
          <div class="card-img img-rounded">
            <img
              src="${path}.jpg"
              class="img-fluid2"
            />
          </div>
          <h4 class="card-text text-center">${name}</h4>
          <div class="card-footer">
            <button value="Unfavourite" id=${id} onclick="updateFavorite(this)" data-character='{"id": "${id}", "name": "${name}", "path": "${path}"}' class="btn bg-danger text-white">Add to Favourite</button>
          </div>
        </div>
        </a>`;

        favoriteContainer.appendChild(div);
    }
  }
  
  renderFavorite();
  
  

// Event listener for search input
searchBtn.addEventListener("click", async () => {
  const query = searchText.value.trim();
  searchText.value = "";
  if (query.length === 0) {
    window.alert("No match found");
    return;
  }

  const url =
    `https://gateway.marvel.com/v1/public/characters?name=${query}&ts=1&apikey=943a74399880af6488cc673a7bf08563&hash=3d65031e20be66dbedaad4b88d9aea55`;

    fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
       console.log(data.data.results);
      let result = data.data.results[0];
      const { id, name, thumbnail } = result;

      // get local favorite character list from local storage
      let favoriteData = getLocalStorage();

      let favorite = "favorite";
      // check searched character is already favorite or not
      for (let j = 0; j < favoriteData.length; j++) {
        if (result.id == favoriteData[j].id) {
          favorite = "UnFavorite";
          break;
        }
      }
      resultContainer.innerHTML = "";
      let h1 = document.createElement("h1");
      h1.innerText = "Search Results-";
      h1.classList.add("text-white");
      h1.classList.add("m-3");
      resultContainer.appendChild(h1);

      // create a chracter and append it to the container div of html
      let div = document.createElement("div");
      div.classList.add("col-3");
      div.setAttribute("id", id);

      div.innerHTML = `<a href="characters.html#${id}">
        <div class="card p-5 m-4 align-items-center">
            <div class="card-img img-rounded">
              <img
                src="${thumbnail.path}.${thumbnail.extension}"
                class="img-fluid2"
              />
            </div>
            <h4 class="card-text text-center">${name}</h4>
            <div class="card-footer">
              <p class="btn bg-danger text-white">Added to Favourite</p>
            </div>
          </div>
          </a>`;

      resultContainer.appendChild(div);
      heroContainer.innerHTML='';
    })
    // if any error occured while fetching data from api then display it on console
    .catch((error) => {
      console.error(error);
      window.alert("No match found");
    });

});
