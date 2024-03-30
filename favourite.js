const favoriteContainer=document.getElementById("favContainer");


function getLocalStorage() {
    let data = JSON.parse(localStorage.getItem("favourite")) || [];
    return data;
  }

  function setStorage(data) {
    let dataString = JSON.stringify(data);
    console.log(dataString);
    localStorage.setItem("favourite", dataString);

    console.log(dataString);
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

    div.innerHTML = `
      <div class="card p-2 m-3 align-items-center">
          <div class="card-img img-rounded">
            <img
              src="${path}"
              class="img-fluid2"
            />
          </div>
          <h4 class="card-text text-center">${name}</h4>
          <div class="card-footer">
            <button value="Unfavourite" id=${id} onclick="updateFavorite(this)" data-character='{"id": "${id}", "name": "${name}", "path": "${path}"}' class="btn bg-danger text-white">Added to Favourite</button>
          </div>
        </div>`;

        favoriteContainer.appendChild(div);
    }
  }
  
  renderFavorite();
