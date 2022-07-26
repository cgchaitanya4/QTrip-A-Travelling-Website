import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
 
  var searchInstance = new URLSearchParams(search)
  return searchInstance.get('adventure')

}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {

  try{
        var backendUrl = await fetch(config.backendEndpoint + '/adventures/detail?adventure='+ adventureId)
        .then(response => response.json())
      return backendUrl
  }catch(error){
        console.log("Backend is down")
      return null
  }

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  
  
  document.getElementById("adventure-name").innerHTML = adventure.name
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle
  document.getElementById("adventure-content").innerHTML = adventure.content
  
  
  for(var img of adventure.images){
    const divElement = document.createElement("div")
    divElement.setAttribute("id","img-div")
    divElement.innerHTML = 
    `
    <img class="activity-card-image" src =${img}>
    `
    document.getElementById("photo-gallery").appendChild(divElement)
  }
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {

  const photoGallery = document.getElementById("photo-gallery")
  photoGallery.setAttribute("class","carousel slide")
  photoGallery.setAttribute("data-ride","carousel")

  const carouselInner = document.createElement("div")
  carouselInner.setAttribute("class","carousel-inner")
  photoGallery.innerHTML = ''

  for(var img of images){
    const divElement = document.createElement("div")
    divElement.setAttribute("class","carousel-item")
    divElement.innerHTML = 
    `
    <img class="activity-card-image d-block w-100" src =${img}>
    `
    carouselInner.appendChild(divElement)
  }
  document.getElementById("photo-gallery").appendChild(carouselInner)
  carouselInner.firstChild.setAttribute("class","carousel-item active")


  const a = document.createElement("a")
  a.setAttribute("class","carousel-control-prev")
  a.setAttribute("role","button")
  a.setAttribute("data-slide", "prev")
  a.setAttribute("href","#photo-gallery")
  a.innerHTML = 
  `
  <span class="carousel-control-prev-icon"  aria-hidden="true"></span>
  <span class="sr-only">Previous</span>
  `
  
  const b = document.createElement("a")
  b.setAttribute("class","carousel-control-next")
  b.setAttribute("role","button")
  b.setAttribute("data-slide", "next")
  b.setAttribute("href","#photo-gallery")
  b.innerHTML = 
  `
  <span class="carousel-control-next-icon"  aria-hidden="true"></span>
  <span class="sr-only">Next</span>
  `
  const ol = document.createElement("ol")
  ol.setAttribute("class","carousel-indicators")
  ol.innerHTML = 
  `
  <li data-target="#photo-gallery" data-slide-to="0" class="active"></li>
  <li data-target="#photo-gallery" data-slide-to="1"></li>
  <li data-target="#photo-gallery" data-slide-to="2"></li>
  `

  photoGallery.appendChild(carouselInner)
  photoGallery.appendChild(ol)
  carouselInner.appendChild(a)
  carouselInner.appendChild(b)

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {


  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none"
    document.getElementById("reservation-panel-available").style.display = "block"
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead
  }else{
    document.getElementById("reservation-panel-available").style.display = "none"
    document.getElementById("reservation-panel-sold-out").style.display = "block"
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  
  const cost = adventure.costPerHead * persons
  document.getElementById("reservation-cost").innerHTML = cost

}

//Implementation of reservation form submission using JQuery
function captureFormSubmit(adventure) {
  
    let url = config.backendEndpoint + "/reservations/new";

    let form = document.getElementById("myForm");
    form.addEventListener('submit', function(e) {

        e.preventDefault();

        const data = {
            name: document.querySelector("#myForm > input:nth-child(2)").value,
            date: document.querySelector("#myForm > input:nth-child(5)").value,
            person: document.querySelector("#myForm > div:nth-child(7) > div:nth-child(2) > input").value,
            adventure: adventure.id
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        // var data = new FormData(form);
        // data.append('adventure',adventure.id);
        console.log(data);


        fetch(url, options)
            .then(function(response) {
                return response.text();

            })

        .then(function(data) {
                alert("Success!");

            })
            .catch(function(err) {
                //alert("Failed!");
                console.log(err);

            })

        // window.location.reload();

    });


}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {

  if(adventure.reserved){
      document.getElementById("reserved-banner").style.display = "block"
  }else{
    document.getElementById("reserved-banner").style.display = "none"
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
