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
    <img src="${card.src.large}" alt="" style="height: 15rem;  object-fit: cover;">
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
            <a onclick="downloadImg(this.src.large)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
</svg></a>
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

// Second button

function loadSecond(){
    loadData()
    setTimeout(loadImgs, 500)
    
}

// load from database

function loadData() {
    fetch(`${dataBase.next_page}`, {
        "method": "GET",
        "headers": {
            "Authorization": "bearer 563492ad6f91700001000001fe7f1bfa604c4313af35b3f3b8ea9b23"
        }
    })
        .then(response => response.json())
        .then(data => dataBase = data)
        .catch(err => alert(err))
}

// Hide card

function hideCard(clickedBtn) { // passing the element as a parameter 
  const card = clickedBtn.parentElement.parentElement.parentElement.parentElement.parentElement // targetting the card by assigning the element (the button itself) to 5 parentElements as it is contained within 5 divs
  
  card.remove() // removing the card
}

// Search

function searchIt(value) {
    fetch(`https://api.pexels.com/v1/search?query=`+value.toLowerCase(), {
        "method": "GET",
        "headers": {
            "Authorization": "bearer 563492ad6f91700001000001fe7f1bfa604c4313af35b3f3b8ea9b23"
        }
    })
        .then(response => response.json())
        .then(data => dataBase = data)
        .catch(err => alert(err))

        rowCard.innerHTML =  ''
        setTimeout(loadImgs, 100)
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
