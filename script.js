class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = false;
    }
    info() {
        return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`)
    }
    changeStatus(){
        if (this.status){
            this.status = false
        } else {
            this.status = true
        }
        return this.status
    }
}

class Library {
    constructor(library){
        this.library = library
    }

    addBookToLibrary(book){
        return this.library.push(book)
    }


    removeBook(book){
        const index = this.library.indexOf(book)
        this.library.splice(index, 1)   
    }

    displayBook(book){
        let myBook = document.createElement("div")
        myBook.classList.add("book")
        myBook.setAttribute("data-name", book.title)
        let bookTitle = document.createElement("h2")
        let bookAuthor = document.createElement("p")
        let bookPages = document.createElement("p")
        let buttonsDiv = document.createElement("div")

        buttonsDiv.classList.add("buttonsDiv")
        let toggleLab = document.createElement("label")
        toggleLab.classList.add("toggle")
        let bookStatus = document.createElement("input")
        bookStatus.setAttribute("type", "checkbox")
        bookStatus.addEventListener("change", () => {
            book.changeStatus()
            bookStatus.parentNode.parentNode.parentNode.classList.toggle("read")
        })
        let slider = document.createElement("span")
        slider.classList.add("slider")
        let labels = document.createElement("span")
        labels.classList.add("labels")
        labels.setAttribute("data-on", "READ")
        let removeBook = document.createElement("button")
        removeBook.classList.add("removeBtn")
        removeBook.textContent = "Remove"
        removeBook.addEventListener("click", (e) => 
        {
            this.removeBook(book)
            e.target.parentNode.parentNode.remove()

        })
        bookTitle.textContent = book.title
        bookAuthor.textContent = `by ${book.author}`
        bookPages.textContent = book.pages
        myBook.append(bookTitle, bookAuthor, bookPages, buttonsDiv)
        toggleLab.append(bookStatus, slider, labels)
        buttonsDiv.append(toggleLab, removeBook)
        bookSection.appendChild(myBook)
    }



    getLibrary(){
        this.library.forEach(book => {
            let bookExists = document.querySelector(`[data-name='${book.title}'`)
            if (!bookExists){
                this.displayBook(book)
            }
        });
    }
}

// DOM Manip

let bookSection = document.querySelector(".books")
let body = document.querySelector("body")
let addBookBtn = document.querySelector(".addBook")
let header = document.querySelector("header")
let form = document.querySelector(".form")



function generateForm(){
    if (!document.querySelector("form")) {
        let myForm = document.createElement("form")
        myForm.setAttribute("name", "bookForm")
        let formToInsert = `            
        <div>
            <label for="title">Title*</label>
            <input type="text" id="title" name="title" required />
        </div>
        <div>
            <label for="author">Author*</label>
            <input type="text" id="author" name="author" required />
        </div>
        <div>
            <label for="pages">Nb of pages*</label>
            <input type="number" id="pages" name="pages" required />
        </div>
        <div>
            <button type="submit" class="submitBook">Add</button>
        </div>  
        `
    myForm.insertAdjacentHTML("afterBegin", formToInsert)
    form.appendChild(myForm)

    let bookForm = document.querySelector('[name="bookForm"]')
    bookForm.addEventListener("submit", (e) => {
        submitForm()
        e.preventDefault()
    })

    
    }
}


addBookBtn.addEventListener("click", () => {
    generateForm()
    bookSection.style.filter = "blur(10px)"
    document.querySelector(".form").classList.toggle("hide")
})


function submitForm(){
    let myNewBook = new Book(
        document.getElementById("title").value,
        document.getElementById("author").value,
        document.getElementById("pages").value
    )
    myLibrary.addBookToLibrary(myNewBook)
    clearInput()
    document.querySelector(".form").classList.toggle("hide")
    bookSection.style.filter = "none"
    myLibrary.getLibrary()
}

function clearInput(){
    document.getElementById("title").value = ""
    document.getElementById("author").value = ""
    document.getElementById("pages").value = ""
}


// // Add dummy info

let myLibrary =  new Library([])

let HarryP = new Book("Harry Potter", "J.K Rowling", "400");
let Test = new Book("Book Test", "Author test", "300");
let PwF = new Book("Playing With Fire", "L.J Shen", "10");

myLibrary.addBookToLibrary(HarryP)
myLibrary.addBookToLibrary(Test)
myLibrary.addBookToLibrary(PwF)

myLibrary.getLibrary()







