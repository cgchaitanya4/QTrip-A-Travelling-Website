import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {

  try{
    const data = await fetch(config.backendEndpoint + '/reservations/')
    .then(response => response.json())
    return data
  }catch(error){
    console.log(error)
    return null
  }

}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  
    if(reservations.length > 0){
      document.getElementById("no-reservation-banner").style.display = "none"
      document.getElementById("reservation-table-parent").style.display = "block"
    }else{
      document.getElementById("no-reservation-banner").style.display = "block"
      document.getElementById("reservation-table-parent").style.display = "none"
    }

 

for(var reserve of reservations){

      const row = document.createElement("tr")
      const date = new Date(reserve.date).toLocaleDateString("en-IN")

      const bookDate = new Date(reserve.time).toLocaleString("en-IN", 
      {  dateStyle:'long'}) 
      const bookTime = new Date(reserve.time).toLocaleString("en-IN", 
      {  timeStyle:'medium'}) 
      const finalBookDate = bookDate +', '+ bookTime
      
      row.innerHTML = 
      `
      <td>${reserve.id}</td>
      <td>${reserve.name}</td>
      <td>${reserve.adventureName}</td>
      <td>${reserve.person}</td>
      <td>${date}</td>
      <td>${reserve.price}</td>
      <td>${finalBookDate}</td>
      <td>
      <div class="reservation-visit-button" id=${reserve.id}>
        <a href="../detail/?adventure=${reserve.adventure}">Visit Adventure
        </a>
      </div>
      </td>
            
      `

      document.getElementById("reservation-table").appendChild(row)
    }


}

export { fetchReservations, addReservationToTable };
