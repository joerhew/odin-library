// constants and variables

const BODY = document.querySelector('body');
const LIBRARY_CONTAINER = document.querySelector('.library');
const SHOW_FORM_BTN = document.querySelector('#btn-show-form');
const ADD_BOOK_BTN =  document.querySelector('#btn-add-book');
const CANCEL_BTN = document.querySelector('#btn-cancel');
const ADD_BOOK_FORM = document.querySelector('form[name="add-book-form"');
const ADD_BOOK_FORM_CONTAINER = document.querySelector('.form-container');

const ERROR_FORM_NOT_FILLED = 'Please fill out all required fields.';

let library = [];

// event listeners

SHOW_FORM_BTN.addEventListener('click', () => {
    ADD_BOOK_FORM_CONTAINER.classList.toggle('hidden');
})

ADD_BOOK_BTN.addEventListener('click', () => {
    validateForm();    
})

CANCEL_BTN.addEventListener('click', () => {
    ADD_BOOK_FORM_CONTAINER.classList.toggle('hidden');
})

// Book class
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = this.read === true ? false : true;
    }
}

// functions

function validateForm() {
    const newBookTitle = document.querySelector('#new-book-title').value;
    const newBookAuthor = document.querySelector('#new-book-author').value;
    const newBookPages = document.querySelector('#new-book-pages').value;
    const newBookRead = document.querySelector('#new-book-read').checked;

    if (newBookTitle === '' || newBookAuthor === '' || newBookPages === '') {
        alert(ERROR_FORM_NOT_FILLED);
    } else {
        const newBook = new Book(newBookTitle,newBookAuthor,newBookPages,newBookRead);
        
        addBookToLibrary(newBook);
        ADD_BOOK_FORM.reset();
    };   
}

function addBookToLibrary(book) {
    library.push(book);
    displayLibrary(library);
}

function displayLibrary() {

    for (let i = 0; i < library.length; i++) {
        let bookCard = document.createElement("div");
        let bookTitle = document.createElement("h2");
        let bookAuthor = document.createElement("p");
        let bookPages = document.createElement("p");
        let bookRead = document.createElement("p");
        let bookButtonContainer = document.createElement("div");
        let btnDelete = document.createElement("button");
        let btnRead = document.createElement("button");

        bookCard.classList.add('book');
        
        bookTitle.classList.add('book-title');
        bookAuthor.classList.add('book-author');
        bookPages.classList.add('book-pages');
        bookRead.classList.add('book-read');
        
        bookButtonContainer.classList.add('edit-btns');
        btnDelete.classList.add('btn-delete-book');
        btnRead.classList.add('btn-toggle-read');
        btnDelete.dataset.name = library[i].title;
        btnRead.dataset.name = library[i].title;

        bookCard.innerText = library[i].title;
        bookAuthor.innerText = library[i].author;
        bookPages.innerText = library[i].pages;
        bookRead.innerText = library[i].read ? 'Read' : 'Unread';

        btnDelete.innerText = 'Delete';
        btnRead.innerText = library[i].read ? 'Mark as unread' : 'Mark as read'


        LIBRARY_CONTAINER.appendChild(bookCard);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookRead);
        
        bookCard.appendChild(bookButtonContainer);
        bookButtonContainer.appendChild(btnDelete);
        bookButtonContainer.appendChild(btnRead);
    }
    let deleteBookBtns = document.querySelectorAll('.btn-delete-book');
    let toggleReadBtns = document.querySelectorAll('.btn-toggle-read');

    deleteBookBtns.forEach(el =>
        el.addEventListener('click', (e) => {
            deleteBook(e); 
            refreshLibrary();
            displayLibrary();
        })
    )

    toggleReadBtns.forEach(el =>
        el.addEventListener('click', (e) => {
            let titleOfBookToToggle = e.target.dataset["name"];
            let bookToToggle = library.find(book => book.title === titleOfBookToToggle);
            bookToToggle.toggleRead(); 
            refreshLibrary();
            displayLibrary();
        })
    )
}

function refreshLibrary() {
    LIBRARY_CONTAINER.innerHTML = "";
}

function deleteBook(e) {
    let titleToDelete = e.target.dataset["name"];
    let indexOfBookToDelete = library.findIndex(book => book.title === titleToDelete);

    library.splice(indexOfBookToDelete,1);
    displayLibrary();
}

window.addEventListener("load", () => {
    displayLibrary();
  });