window.onload = function () {
    let wrapper = document.getElementById("character");
  
    let winurl = window.location.href;
    let id = winurl.substring(winurl.lastIndexOf("#") + 1) || 1017100;
  
    // character details
    let url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=943a74399880af6488cc673a7bf08563&hash=3d65031e20be66dbedaad4b88d9aea55`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.data.results);
        let character = data.data.results[0];
        const {name, description} = character;

        let div = document.createElement("div");
      div.classList.add("col-12");

      div.innerHTML = `
        <div class="card p-2 m-3 align-items-center">
           
            <h1 class="card-text text-center">${name}</h1>
            <div class="card-footer">
            <p>${description || "Description not found"}</p>
            </div>
          </div>
        `;
        wrapper.appendChild(div);
      })
      // if any error occured while fetching data from api then display it on console
      .catch((error) => {
        console.log(error);
      });
  
    // character related comics
    let comicsWrapper = document.getElementById("comics");
    comicsWrapper.innerHTML = "";
    url = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?ts=1&apikey=943a74399880af6488cc673a7bf08563&hash=3d65031e20be66dbedaad4b88d9aea55`;
  
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        let comics = res.data.results;
        // iterate over all the comics and render it on browser
        for (let comic of comics) {
          const { title, thumbnail } = comic;
          let div = document.createElement("div");
          div.classList.add("col-3");
    
          div.innerHTML = `
            <div class="card p-2 m-3 align-items-center">
                <div class="card-img img-rounded">
                  <img
                    src="${thumbnail.path}.${thumbnail.extension}"
                    class="img-fluid2"
                  />
                </div>
                <h5 class="card-text text-center">${title}</h5>
                <div class="card-footer">
                
                </div>
              </div>
              `;    
         
          comicsWrapper.appendChild(div);
        }
      })
      // if any error occured while fetching data from api then display it on console
      .catch((error) => {
        console.error(error);
      })
  };