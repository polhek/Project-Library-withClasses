

class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }
}

class Library {
  // myLibrary = localStorage.getItem("library") ? JSON.parse(localStorage.getItem("library")) :
  // [
  //     {
  //       title: "Harry Potter - and the Philosopher's Stone",
  //       author: "J. K. Rowling",
  //       pages: 223,
  //       readStatus: "no",
  //     },
  // ];

  myLibrary = localStorage.getItem("library") ? JSON.parse(localStorage.getItem("library")) : [
    // {
    //   title: "Harry Potter - and the Philosopher's Stone",
    //   author: "J. K. Rowling",
    //   pages: 223,
    //   readStatus: "no",
    // },
    ];

  addBook(book) {
    this.myLibrary.push(book);
  }

  deleteBook(card) {
    this.myLibrary.splice([...card.parentElement.children].indexOf(card), 1);
  }

  saveToLocalStorage() {
    localStorage.setItem("library", JSON.stringify(this.myLibrary));
  }

  readStatusYes(bookCard) {
    this.myLibrary[[...bookCard.parentElement.children].indexOf(this.bookCard)].readStatus = "yes";
  }
}

class UIcontroller {
  // DOM elements

  myLibrary = new Library();
  book = new Book();
  i = "";

  // Render books on the page..
  render() {
    this.loadEvents();
    const books = this.myLibrary.myLibrary;
    console.log(books)
    books.forEach((book) => {
      this.addNewBookUI(book);
      
    });
  }

  // Add book in UI...
  addNewBookUI(book) {
    let i = "";

    if (book.readStatus === "yes") {
      i = "Read";
    } else {
      i = "Not read";
    }
    const main = document.querySelector(".main");
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `<div class="delete_button"><button class="delete btn"><i class="fa fa-trash">
          </i></button></div><div class="title">${book.title}</div><div class="author">${book.author}
          </div><div class="pages">${book.pages}</div><div class="button_status"><button class="book_status">${i}</button></div>`;
    main.appendChild(bookCard);
  }

  getNewBook(event) {
    // prevent actual submit
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const readStatus = document.querySelector('input[name="yes_no"]:checked').value;
    // prevent empty fields ...

    let bookToInsert = "";

    if (title === "" || author === "" || pages === "0") {
      alert("Missing data");
      bookToInsert = {
        title: title,
        author: author,
        pages: pages,
        readStatus: readStatus,
      };
    } else {
      bookToInsert = {
        title: title,
        author: author,
        pages: pages,
        readStatus: readStatus,
      };
      // console.log(bookToInsert);

      let bookExists = this.myLibrary.myLibrary.some(
        (book) => book.title == bookToInsert.title
      );
      // console.log(bookExists);

      if (bookExists) {
        alert("It already exists");
      } else {
        const newBook = new Book(title, author, pages, readStatus);
        this.myLibrary.addBook(newBook);
        this.addNewBookUI(newBook);

        this.clearFormFields();
        this.myLibrary.saveToLocalStorage();
        
        //saveToLocalStorage();
      }
    }
  }

  addEventsToAllButtons(ev) {
    let el = ev.target.classList.contains("fa-trash")
      ? ev.target.parentElement
      : ev.target.classList.contains("delete")
      ? ev.target
      : false;
    if (el) {
      let card = el.parentElement.parentElement;
      // remove array-element from myLibrary...
      
      
      //this.myLibrary.myLibrary.splice([...card.parentElement.children].indexOf(card), 1);
      
      this.myLibrary.deleteBook(card);
      //remove DOM of book...
      card.remove();
      
      
      // clear local storage and add new myLibrary to local
      
      localStorage.clear();
      this.myLibrary.saveToLocalStorage();

      //localStorage.clear();
      //saveToLocalStorage(myLibrary);
    }
  }

  readStatus(e) {
    if (e.target.classList.contains("book_status")) {
      let bookCard = e.target.parentElement.parentElement;
        if (e.target.textContent == "Not read") {
          e.target.textContent = "Read";
          this.myLibrary.myLibrary[[...bookCard.parentElement.children].indexOf(bookCard)].readStatus = "yes";
          // console.log(this.myLibrary.myLibrary[[...bookCard.parentElement.children].indexOf(bookCard)].readStatus);
          // console.log(this.myLibrary.myLibrary);
        } else if (e.target.textContent == "Read") {
          e.target.textContent = "Not read";
          this.myLibrary.myLibrary[[...bookCard.parentElement.children].indexOf(bookCard)].readStatus = "no";
          // console.log(this.myLibrary.myLibrary[[...bookCard.parentElement.children].indexOf(bookCard)].readStatus);
          // console.log(this.myLibrary.myLibrary);
    }
    localStorage.clear();
    this.myLibrary.saveToLocalStorage(this.myLibrary.myLibrary);
  }
  }


  loadEvents() {
    document.querySelector(".book-form").addEventListener("submit", (e) => this.getNewBook(e));

    document.querySelector(".main").onclick = (ev) => 
      this.addEventsToAllButtons(ev);


    document.querySelector(".main").addEventListener("click", (e) => this.readStatus(e)); 
    
  }

  clearFormFields() {
    const myForm = document.getElementById("myForm");
    myForm.reset();
  }
};

let UIController = new UIcontroller();
UIController.render();


function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}