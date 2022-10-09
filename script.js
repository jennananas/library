class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
    info() {
        return (`${title} by ${author}, ${pages} pages, ${isRead}`)
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
        return this.library.splice(index, 1)
    }

    displayBook(book){
        let myBook = document.createElement("div")
        myBook.classList.add("book")
        myBook.setAttribute("data-name", book.title)
        let bookTitle = document.createElement("h2")
        let bookAuthor = document.createElement("p")
        let bookPages = document.createElement("p")
        let bookStatus = document.createElement("p")
        let removeBook = document.createElement("button")
        removeBook.classList.add("removeBtn")
        removeBook.textContent = "Remove"
        bookTitle.textContent = book.title
        bookAuthor.textContent = `by ${book.author}`
        bookPages.textContent = book.pages
        bookStatus.textContent = book.isRead
        myBook.append(bookTitle, bookAuthor, bookPages, bookStatus, removeBook)
        return bookSection.appendChild(myBook)
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

// FORM 

function generateForm(){
    if (!document.querySelector("form")) {
        let myForm = document.createElement("form")
        // myForm.setAttribute("method", "POST")
        // myForm.setAttribute("action", "#")
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
            <label for="pages">Nb of pages</label>
            <input type="number" id="pages" name="pages" required />
        </div>
        <div>
            <label for="status">Reading status*</label>
            <select name="status" id="status" required>
                <option value="not started">Not started</option>
                <option value="reading">Reading</option>
                <option value="finished">Finished</option>
            </select>
        </div>
        <div>
            <button type="submit" class="submitBook">Add</button>
        </div>  
        `
    myForm.insertAdjacentHTML("afterBegin", formToInsert)
    form.appendChild(myForm)
    }}

// // Affichage du formulaire //   

addBookBtn.addEventListener("click", () => {
    generateForm()
    bookSection.style.filter = "blur(10px)"
    // document.querySelector(".form").classList.toggle("hide")

})

// // Submit form

document.addEventListener("click", (e) => {
    if(e.target.matches(".submitBook")){
        // e.preventDefault()
        let myNewBook = new Book(
            document.getElementById("title").value,
            document.getElementById("author").value,
            document.getElementById("pages").value,
            document.getElementById("status").value
        )
        // clearInput()
        myLibrary.addBookToLibrary(myNewBook)
        document.querySelector("form").remove()
        bookSection.style.filter = "none"
        myLibrary.getLibrary()
    }
} )

function clearInput(){
    document.getElementById("title").value = ""
    document.getElementById("author").value = ""
    document.getElementById("pages").value = ""
    document.getElementById("status").value = ""
}


// Add dummy info

let myLibrary =  new Library([])

let HarryP = new Book("Harry Potter", "J.K Rowling", "400", "read");
let Test = new Book("Book Test", "Author test", "300", "not read yet");
let PwF = new Book("Playing With Fire", "L.J Shen", "400", "read");

myLibrary.addBookToLibrary(HarryP)
myLibrary.addBookToLibrary(Test)
myLibrary.addBookToLibrary(PwF)

myLibrary.getLibrary()


