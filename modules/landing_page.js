import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  
  try{
    return await fetch(config.backendEndpoint+'/cities')
    .then(response => response.json())
  }
  
  catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {

  let container = document.createElement("div");
  container.className = "col-12 col-sm-6 col-lg-3 mb-4 d-flex align-content-stretch flex-wrap";
  container.id= "cardid"

  let HTML = `
          <a id=${id} href="pages/adventures/?city=${id}" class="tile">\
            <div class="tile-text">\
              <h5>${city}</h5>\
              <p>${description}</p>\
            </div>  
            <img src="${image}" class="img-fluid" >\
          </a>
  `
  container.innerHTML = HTML;

  document.getElementById("data").appendChild(container);

}



export { init, fetchCities, addCityToDOM };
