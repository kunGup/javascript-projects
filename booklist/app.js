//book class
class Book{
    constructor(title,author,isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

//ui class
class UI{
    static displayBooks(){
        let books = Store.getBooks()
        books.forEach((book)=>UI.addBooktoList(book))
    }
    static addBooktoList(book){
        const bookList = document.querySelector('#book-list')
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a class='btn btn-danger delete'>X</a></td>
        `
        bookList.appendChild(row)
    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove()
        }
    }
    static showAlert(message,className){
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        container.insertBefore(div,form)

        setTimeout(()=>{
            div.remove()
        },3000)
    }
    static clearfields(){
        const form = document.querySelector('#book-form')
        form.querySelector('#title').value = ''
        form.querySelector('#author').value = ''
        form.querySelector('#isbn').value = ''

    }
}
//store class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }

    static addBook(book){
        let books = Store.getBooks()
        books.push(book)
        localStorage.setItem('books',JSON.stringify(books))
    }

    static removeBook(isbn){
        let books = Store.getBooks()
        books.forEach((book,index) => {
            if(book.isbn === isbn)
            books.splice(index,1)
        })
        localStorage.setItem('books',JSON.stringify(books))
    }
}

//Event: to display books
document.addEventListener('DOMContentLoaded',UI.displayBooks)
//Event: to add book
document.addEventListener('submit',(e)=>{
    e.preventDefault()
    const form = document.querySelector('#book-form')
    let title = form.querySelector('#title').value
    let author = form.querySelector('#author').value
    let isbn = form.querySelector('#isbn').value
    const book = {
        title,
        author,
        isbn
    }

    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill in all fields','danger')
    }
    else{
        //add book to list
        UI.addBooktoList(book)
        
        Store.addBook(book)

        //show success message
        UI.showAlert('Book successfully added','success')
    
        //clear field
        UI.clearfields()
    }
})
//Event: to remove book
document.querySelector('#book-list').addEventListener('click',(e)=>{
    UI.deleteBook(e.target)

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    UI.showAlert('Book successfully removed','success')
})