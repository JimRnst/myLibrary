const libray = (function(){

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

    function addBookToLibrary(){
        if(bookTitle.value.length === 0 || bookAuhtor.value.length === 0 || bookPages.value.length === 0){
            alert("Please, fill all the fields");
        };
        
        myLibrary.push({title: bookTitle.value, author: bookAuhtor.value, pages: bookPages.value, status: bookStatus.value});
    };

    function showBook(){
        table.textContent = ""
        for(let i = 0; i < myLibrary.length; i++){
            const row = document.createElement("tr");
            row.setAttribute("id", `${i}`);
            row.innerHTML  = `
                <td>${myLibrary[i].title}</td>
                <td>${myLibrary[i].author}</td>
                <td>${myLibrary[i].pages}</td>
                <td class="btn-status">${myLibrary[i].status}</td>
                <td class="removeBooks"><i class="fa-solid fa-xmark"></i></td>
            `;
            table.prepend(row);
        };
    };

    function clearForm(){
        bookTitle.value = "";
        bookAuhtor.value = "";
        bookPages.value = "";
    };

    //eventListener
    openMenu.addEventListener("click", () => {
        document.querySelector("main").classList.toggle("open-form");
        document.querySelector("#menu").classList.toggle("open-form");
    });

    closeMenu.addEventListener("click", () => {
        document.querySelector("main").classList.remove("open-form");
        document.querySelector("#menu").classList.remove("open-form");
    });


    btnSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        addBookToLibrary();
        showBook();
        clearForm();
        document.querySelector("main").classList.remove("open-form");
        document.querySelector("#menu").classList.remove("open-form");
    });

    table.addEventListener("click", (e) => {
        if(e.target.className === "fa-solid fa-xmark"){
            document.getElementById(e.target.parentNode.parentNode.id).remove();
            myLibrary.splice(myLibrary.findIndex(book => book.title === e.target.parentElement.parentElement.children[0].innerText));
        };

        if(e.target.className === "btn-status"){
            let bookId = e.target.parentNode.id;
            if(e.target.textContent === "Read"){
                myLibrary[bookId].status = "Not Read"
                e.target.textContent = "Not Read"
            } else{
                myLibrary[bookId].status = "Read"
                e.target.textContent = "Read"
            };
        };
    });
})();