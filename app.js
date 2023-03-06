class Book{
   
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }

}  


class UI{

    static addBookToList(book){

        const list = document.querySelector("#book-list")
        const row = document.createElement("tr")
        row.innerHTML = `
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`
         console.log(row)
         list.appendChild(row)                
  
    }

    static ClearAllFields(){
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    
    }

    static  showAlert(msg,className){
        const div = document.createElement("div")
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(msg))
        //console.log(div)
        const container = document.querySelector(".container")
        const form = document.querySelector("#book-form")
        container.insertBefore(div,form)
        setTimeout(function(){
          document.querySelector(".alert").remove()
        },3000)
    
    }

    static displayBook(){
       // const StoredBooks = [{
       //     title:'Book One',
       //     author:'abc',
       //     isbn:123
       // },{
       //     title:'Book two',
       //     author:'aabb',
       //     isbn:1234
       // }]
       //  const books = StoredBooks
         const books = store.getBooks();

         books.forEach(book => UI.addBookToList(book))
        
    }
    static deleteBook(x){
        if(x.target.classList.contains('delete')){
            if(confirm("Are You Sure U Want To Delete This ?")){
              x.target.parentElement.parentElement.remove()
            }else{
                showAlert("cancel")
            }
            
         }
    }
}

 class  store{
     static addBook(book){
         const books =store.getBooks();
         books.push(book);
         localStorage.setItem("books",JSON.stringify(books))
     }

     static getBooks(){
       let books;
       if(localStorage.getItem("books")===null){
           books = [];
       }else{
           books=JSON.parse(localStorage.getItem("books"))
           return books;
       }
     }

      static removeBook(isbn){
     // console.log(isbn)
       const books = store.getBooks();
       console.log(books)
       books.forEach((book,index) => {
           if(book.isbn===isbn)books.splice(index,1)
       })
       console.log(books)
       localStorage.setItem("books",JSON.stringify(books))
    }

}

//Events

  document.addEventListener('DOMContentLoaded',()=>{UI.displayBook()})   

  document.querySelector('#book-form').addEventListener('submit',(e)=>{
    e.preventDefault()  
   const title = document.querySelector("#title").value;
   const author = document.querySelector("#author").value;
   const isbn = document.querySelector("#isbn").value;
   //console.log(title,author,isbn)
    if(title==""|| author == "" || isbn == ""){
      UI.showAlert("Please Add All The Fields","danger");
       return;
    }
     const book = new Book(title,author,isbn)
    //console.log(book)
    UI.addBookToList(book)

    store.addBook(book);
    UI.ClearAllFields();   
    UI.showAlert("Book Added SuccessFully","success")
    
})

document.querySelector("#book-list").addEventListener('click',(x)=>{
    UI.deleteBook(x)
    store.removeBook(x.target.parentElement.previousElementSibling.textContent)
    
    UI.showAlert("Book Deleted SuccessFully","success") 
})