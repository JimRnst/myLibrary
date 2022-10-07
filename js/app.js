const libray = (function(){

    // var
const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");

const bookTitle = document.querySelector("#title");
const bookAuhtor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookStatus = document.querySelector("#status");
const btnSubmit = document.querySelector("#btn-add-book");;
const table = document.querySelector("tbody");



let myLibrary = [];

//functions

class Book{
    constructor(title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    }
}

function addBookToLibrary(){
    if(bookTitle.value.length === 0 || bookAuhtor.value.length === 0 || bookPages.value.length === 0){
        alert("Please, fill all the fields");
        return;
    } 

    const book = new Book(bookTitle.value, bookAuhtor.value, bookPages.value, bookStatus.value);
    
    myLibrary.push(book);
}

function showBook(){
    table.textContent = ""
    for(let i = 0; i < myLibrary.length; i++){
        const row = document.createElement("tr");
        row.setAttribute("id", `${i}`)
         row.innerHTML  = `
            <td>${myLibrary[i].title}</td>
            <td>${myLibrary[i].author}</td>
            <td>${myLibrary[i].pages}</td>
            <td class="btn-status">${myLibrary[i].status}</td>
            <td class="removeBooks"><i class="fa-solid fa-xmark"></i></td>

         `
        table.prepend(row)
    }
}

function clearForm(){
    bookTitle.value = "";
    bookAuhtor.value = "";
    bookPages.value = "";


}

function changeStatus(id){
   
}

function deleteBook(id){
    let bookToDelete = document.getElementById(id);
    table.removeChild(bookToDelete)

    myLibrary.splice(id, 1)
}

//eventListener
openMenu.addEventListener("click", () => {
    document.querySelector("main").classList.toggle("open-form");
    document.querySelector("#menu").classList.toggle("open-form")
});

closeMenu.addEventListener("click", () => {
    document.querySelector("main").classList.remove("open-form");
    document.querySelector("#menu").classList.remove("open-form")
})


btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    addBookToLibrary();
    showBook();
    clearForm();
});

table.addEventListener("click", (e) => {
   if(e.target.className === "fa-solid fa-xmark"){
    deleteBook(e.target.parentNode.parentNode.id);
   } 

   if(e.target.className === "btn-status"){
    let bookId = e.target.parentNode.id;
    if(e.target.textContent === "Read"){
        myLibrary[bookId].status = "Not Read"
        e.target.textContent = "Not Read"
    } else{
         myLibrary[bookId].status = "Read"
         e.target.textContent = "Read"
    }
    
   }
})
})();