import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  let searchParams = new URLSearchParams(search);
  return searchParams.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  let url = config.backendEndpoint + `/adventures?city=${city}`;
  try {
    return await fetch(url).then((response) => response.json());
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {

  for (let cityObject of adventures) {
    let card_container = document.createElement("div");
    card_container.className = "col-sm-12 col-md-6 col-lg-3 mb-4";
    card_container.id = "F";

    let inner_HTML = `<a href="detail/?adventure=${cityObject.id}" id="${cityObject.id}">
                          <div class="card activity-card">
                            <div class="category-banner">${cityObject.category}</div>
                            <img src="${cityObject.image}" alt="${cityObject.id}">
                            <div class="card-body d-flex justify-content-between w-100 pb-1">
                              <p class="card-title">${cityObject.name}</p>
                              <p class="card-text">₹ ${cityObject.costPerHead}</p>                  
                            </div>
                            <div class="card-body  d-flex justify-content-between w-100 pt-1">
                              <p class="card-title">Duration</p>
                              <p class="card-text">${cityObject.duration} Hours</p>                  
                            </div>

                          </div>
                        </a>`;
    card_container.innerHTML = inner_HTML;
    document.getElementById("data").appendChild(card_container);
  }
}



// To run the onclick function after DOM is loaded window.onload is used .
window.onload = function () {
  document.getElementById("button").onclick = async function () {
    randomAdventure();
  };
};
// randonAdventure function executes onclick which in turn send post request with input {city: name of city} and in response it add new adventure to city
async function randomAdventure() {
  const id = getCityFromURL(window.location.search);
  const dataToSend = JSON.stringify({ city: `${id}` });
  const dataReceived = await fetch(`${config.backendEndpoint}/adventures/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: dataToSend,
  });
  window.location.reload();
  return dataReceived.json(); // parse JSON response in native javascript object.
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  const filteredList = list.filter(
    (key) => key.duration > low && key.duration <= high
  );
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  return list.filter((adventure) => {
    if (categoryList.includes(adventure.category)) return adventure;
  });
}


function filterFunction(list, filters) {
  let filteredList = []


  if(filters["duration"].length > 0 && filters["category"].length > 0){
    let choice = filters["duration"].split("-")
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    )
    filteredList = filterByCategory(filteredList, filters["category"])
  }


  else if(filters["duration"].length > 0){
    let choice = filters["duration"].split("-")
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    )
  }


  else if(filters["category"].length > 0){
    filteredList = filterByCategory(list, filters["category"])
  }

  else{
    filteredList = list;
  }
  return filteredList;
}

function saveFiltersToLocalStorage(filters) {

  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

function getFiltersFromLocalStorage() {

  return JSON.parse(window.localStorage.getItem("filters"));


function generateFilterPillsAndUpdateDOM(filters) {
  
  document.getElementById("duration-select").value = filters.duration;

  filters["category"].forEach((key) => {
    let ele = document.createElement("div");
    ele.className = "category-filter";
    ele.innerHTML = `<div>${key}</div>`;

    document.getElementById("category-list").appendChild(ele);
  });
}


export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  randomAdventure,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM
};
