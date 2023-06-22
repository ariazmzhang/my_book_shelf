
function fetchBookInfo() {
  const title = document.getElementById('title').value;
  const authors = document.getElementById('authors').value;
  const isbn = document.getElementById('isbn').value;

  var bookInfo = {
      bookTitle: `${title}`,
      bookAuthors: `${authors}`,
      bookISBN: `${isbn}`,
    };
  
  
      
  // Make a POST request to the server with JSON data
  fetch('http://localhost:3001/books', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bookInfo)
  })
  .then(response => response.json()) // response from server
  .then(bookInfo => {
    console.log('Raw JSON response:', JSON.stringify(bookInfo));
    
    // add the 20 top book info to the search results book table
    let searchResultTable = document.getElementById('matching_result')
    searchResultTable.innerHTML = ''
    for (let i = 0; i < bookInfo.items.length; i++){
      searchResultTable.innerHTML = searchResultTable.innerHTML + `
                            <tr>
                              <td id="button">
                                <button id="add_button">+</button>
                              </td>
                              <td>${bookInfo.items[i].volumeInfo.title}</td>
                              <td>${bookInfo.items[i].volumeInfo.authors}</td>
                              <td><img src=${bookInfo.items[i].volumeInfo.imageLinks.smallThumbnail}></td>
                            </tr>`        
    }
  })
  .catch(error => {
    console.error('Error sending JSON data:', error);
  });
}


function addBooks(event){
  if (event.target.tagName === "BUTTON"){
    const addLine = event.target.parentNode.parentNode
    let bookShelfTable = document.getElementById('book_shelf_table')
    bookShelfTable.innerHTML = bookShelfTable.innerHTML + `
      <tr>
        <td id="button">
            <button id="remove_button">-</button>
            <button id="up_button">⬆️</button>
            <button id="down_button">⬇️</button>
        </td >
        <td id="book_name">${addLine.getElementsByTagName("td")[1].innerHTML}</td>
        <td id="book_authors">${addLine.getElementsByTagName("td")[2].innerHTML}</td>
        <td id="book_img">${addLine.getElementsByTagName("td")[3].innerHTML}</td>
      </tr>
    `
  }
}

// add books from the search result to notion
function addBookToNotion(event){
  const socket = io('http://localhost:3001/books')
  if (event.target.tagName === "BUTTON"){
    const addLine = event.target.parentNode.parentNode

    let bookTitle = addLine.getElementsByTagName("td")[1].innerHTML
    let bookAuthors = addLine.getElementsByTagName("td")[2].innerHTML
    let bookImg = addLine.getElementsByTagName("td")[3].innerHTML

    var bookInfo = {
      bookTitle: `${bookTitle}`,
      bookAuthors: `${bookAuthors}`,
      bookImg: `${bookImg}`,
    };
    socket.emit('bookInfoToNotion', bookInfo);
  }
}