const LIBRARY = document.querySelector('.library');
const ADD_BOOK_BTN = document.querySelector('#btn-add-book');
const ADD_BOOK_FORM = document.querySelector('form[name="add-book-form"');

let myLibrary = [];
let deleteBookBtns = [];

ADD_BOOK_BTN.addEventListener('click', () => {
    ADD_BOOK_FORM.classList.toggle('hidden');
})

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayLibrary() {
    for (let i = 0; i < myLibrary.length; i++) {
        const DISPLAY_BOOK = document.createElement("div");
        const DISPLAY_TITLE = document.createElement("h2");
        const DISPLAY_AUTHOR = document.createElement("p");
        const DISPLAY_PAGES = document.createElement("p");
        const DISPLAY_READ = document.createElement("p");
        
        const DIV_BTNS = document.createElement("div");
        const DEL_BTN = document.createElement("button");
        const READ_BTN = document.createElement("button");

        DISPLAY_BOOK.classList.add('book');
        DISPLAY_BOOK.id = `book-${i}`
        
        DISPLAY_TITLE.classList.add('book-title');
        DISPLAY_AUTHOR.classList.add('book-author');
        DISPLAY_PAGES.classList.add('book-pages');
        DISPLAY_READ.classList.add('book-read');
        
        DIV_BTNS.classList.add('edit-btns');
        DEL_BTN.classList.add('btn-delete-book');
        READ_BTN.classList.add('btn-toggle-read');
        DEL_BTN.dataset.name = myLibrary[i].title;
        READ_BTN.dataset.name = myLibrary[i].title;

        DISPLAY_BOOK.innerText = myLibrary[i].title;
        DISPLAY_AUTHOR.innerText = myLibrary[i].author;
        DISPLAY_PAGES.innerText = myLibrary[i].pages;
        DISPLAY_READ.innerText = myLibrary[i].read;

        DEL_BTN.innerText = 'Delete';
        READ_BTN.innerText = 'Mark read/unread';

        LIBRARY.appendChild(DISPLAY_BOOK);
        DISPLAY_BOOK.appendChild(DISPLAY_TITLE);
        DISPLAY_BOOK.appendChild(DISPLAY_AUTHOR);
        DISPLAY_BOOK.appendChild(DISPLAY_PAGES);
        DISPLAY_BOOK.appendChild(DISPLAY_READ);
        
        DISPLAY_BOOK.appendChild(DIV_BTNS);
        DIV_BTNS.appendChild(DEL_BTN);
        DIV_BTNS.appendChild(READ_BTN);
    }
    // Defining the delete buttons after the books have been dynamically created
    deleteBookBtns = document.querySelectorAll('.btn-delete-book');     
}

function refreshLibrary() {
    LIBRARY.innerHTML = "";
    displayLibrary();
}

function deleteBook(e) {
    let titleToDelete = e.target.dataset["name"];
    let indexOfBookToDelete = myLibrary.findIndex(book => book.title === titleToDelete);

    myLibrary.splice(indexOfBookToDelete,1);
    refreshLibrary();
}

window.addEventListener("load", (event) => {
    let bookOne = new Book("Designing Your Life","Dave Burnett",256,"Not Read");
    let bookTwo = new Book("Atomic Habits","James Clear",312,"Read");

    addBookToLibrary(bookOne);
    addBookToLibrary(bookTwo);

    displayLibrary();

  });

// The event listeners are not firing, even though in console I can see that deleteBookBtns are correctly defined
deleteBookBtns.forEach(el =>
    el.addEventListener('click', (e) => {
        deleteBook(e);
    })
)