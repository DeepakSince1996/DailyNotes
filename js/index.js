console.log("Welcomes to Daily Notes");
showDetails();
let addbtn = document.getElementById("addBtn");

addbtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");

  if (addTxt.textLength == 0) {
      alert("Please write something in text box first!")
  }
  else{
    let notes = localStorage.getItem("notes");

    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    console.log(notesObj);
    showDetails();
  }
 
  
});

function showDetails() {
  let html = "";
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let noteList = document.getElementById("noteList");

  notesObj.forEach(function (element, index) {
    html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1} </h5>
                    <p class="card-text">${element}</p>
                    <button onclick="deleteBtn(${index})" id="deleteBtn" type="button" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
  });

  if (notesObj.length != 0) {
    noteList.innerHTML = html 
  }
  else{
      noteList.innerHTML = `<h5>Nothing to show! Use "Add a Note" section. </h5>`
  }
}

function deleteBtn(index) {

    let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showDetails();
    
}

let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input",function(){
    let inputValue = searchTxt.value.toLowerCase();
    let cards = document.getElementsByClassName("noteCard");
    Array.from(cards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardTxt.includes(inputValue)) {
            element.style.display = "block";

            
        }
        else{
            element.style.display = "none";
        }
        
    })
})
