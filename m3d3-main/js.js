let dataBase = 

window.onload = () => {
    fetchFirst()
}

// Run initial fetch 

function fetchFirst(){
    fetch("https://api.pexels.com/v1/search?query="+value.toLowerCase(), {
        "method": "GET",
        "headers": {
            "Authorization": "bearer 563492ad6f91700001000001fe7f1bfa604c4313af35b3f3b8ea9b23"

        }
    })
    .then(response => response.json()) // converting response to JSON
    .then(data => dataBase = data) // assigning the data to the dataBase variable on line 1
    .catch(err => alert(err)) // catching any errors and displaying in an alert

}
// Checking the data has returned successfully

setTimeout(check, 500)  // after half a second, passing the check function into the setTimeout function
function check (){ 
    console.log(dataBase) // which console logs the data (dataBase)
}





// DOM Manipulation


const rowCard = document.getElementById('rowCard') // targetting the div with ID 'rowCard'


function loadImgs(){

for(let card of dataBase.photos){ // using a for loop to iterate through each item, called card, within the data, called dataBase and target the images in each API entry with .photos

    // below taking the rowCard section and using innerHTML += and template literals to insert our bootstrap card and displaying the different sections of API data by using the name we gave for each item plus .theSectionName  within ${} e.g. ${card.src.large} 

    rowCard.innerHTML += `
    <div class="col-md-4 mb-4">
    <div class="card mb-4 shadow-sm h-100">
    <img src="${card.src.large}" alt="" style="height: 10rem;  object-fit: cover;">
      <div class="card-body">
        <p class="card-text">${card.photographer}</p>
        <div
          class="d-flex justify-content-between align-items-center"
        >
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
            >
              View
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary" onclick="hideCard(this)">
              Hide
            </button>
          </div>
          <small class="text-muted">id:${card.id}</small>
        </div>
      </div>
    </div>
  </div>
`
}
alertM()
}

// second Button
function loadSecond(){
    loadData()
    setTimeout(loadImgs, 500)
    
}
// load from database
function loadData() {
    fetch(`${dataBase.next_page}`, {
        "method": "GET",
        "headers": {
            "Authorization": "bearer 563492ad6f917000010000010c07485ab4c945a295e08a494dec09ff"
        }
    })
        .then(response => response.json())
        .then(data => dataBase = data)
        .catch(err => alert(err))
}

// Hide Card

function hideCard(inf) {
  const card = inf.parentElement.parentElement.parentElement.parentElement.parentElement
  
  card.remove()
}

// SEARCH
function searchIt(value) {
    fetch(`https://api.pexels.com/v1/search?query=`+value.toLowerCase(), {
        "method": "GET",
        "headers": {
            "Authorization": "bearer 563492ad6f917000010000010c07485ab4c945a295e08a494dec09ff"
        }
    })
        .then(response => response.json())
        .then(data => dataBase = data)
        .catch(err => alert(err))

        rowCard.innerHTML =  ''
        setTimeout(loadImgs, 500)
}


// Alert

function alertM(m){
    let body = document.querySelector('.jumbotron .container')
    body.innerHTML += `
    <div class="alert alert-secondary  w-50 text-center" role="alert" style="margin: auto !important; transition: 1s">
        Uploaded ${dataBase.photos.length} images
    </div>`
    setTimeout(()=>{
        let div = document.querySelector('.jumbotron .container .alert')
        div.remove()
    }, 2500)
}
