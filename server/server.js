const http = require('http');
const express = require('express');

const PORT = process.env.PORT || 3001 //allow environment variable to possible set PORT
const bodyParser = require('body-parser')
const app = express();
const io = require('socket.io')(server);

// Enable CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyParser.json())
app.use(express.static('public')) //static server

const servePage = (request, res) => {
  response.sendFile(__dirname + '/public/index.html');
};

//Routes
app.get('/', servePage);
app.get('/index.html', servePage);

// get the post request from the browser
app.post('/books', (request, res) => {
  console.log(request.body)
  const bookInfo = request.body;
  if(!bookInfo) {
    //send json response to client using response.json() feature of express
    response.json({message: 'Please enter a song name'})
    return
  }
  // const titleWithPlusSigns = encodeURIComponent(songTitle);
  console.log("This is the request from the browser: ", bookInfo)

  // fetch the book information from Google Books API
  const apiKey = 'AIzaSyCLX1RyRdK6lVihjTFa9pKNV-VOy7OJDFM';
  const apiURL = `https://www.googleapis.com/books/v1/volumes?q=${bookInfo.bookTitle}+${bookInfo.bookAuthors}+${bookInfo.bookISBN}&key=${apiKey}`

  console.log(apiURL)

  // fetch API is not stable, may change later
  fetch(apiURL)
    .then(response => response.json())
    .then(data =>{
      // only get the top 20 results from the google book API
      if (data.totalItems > 20){
        data.items = data.items.slice(0, 20)
      }
      console.log(data)
      res.writeHead(200);

      // send back the search results to the browser
      res.end(JSON.stringify(data.items));
    })
    .catch(error => {
      console.error('Error fetching book info:', error);
      res.writeHead(500);
      res.end('Internal Server Error');
  })

})

//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT}`)
    console.log(`To Test:`)
    console.log(`http://localhost:3000/index.html`)
    console.log(`http://localhost:3000/`)
    console.log(`http://localhost:3001`)
  }
})




function fetch_notion_books_api(){
  // Set your Notion API key
  const api_key = "secret_Cx5oui77A5URSMrMN8e6PzRxMKhlKnQUdm8PjBfeWWn"
  // Set the database ID
  const database_id = '78af2031510941dea9ab80b0a9a93a69'
  const endpoint_database = `https://api.notion.com/v1/databases/${database_id}`
  const endpoint_pages = `https://api.notion.com/v1/pages`
  const endpoint_query = `https://api.notion.com/v1/databases/${database_id}/query`

  const headers = {
    'Authorization': `Bearer ${api_key}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28'
  }

  io.on('bookInfoToNotion', (socket) => {

    socket.on('dataFromClient', (data) => {
      console.log('Received data from client:', data);
    });
    const bookTitle = data.bookTitle
    const bookAuthors = data.bookAuthors
  
  var response = requests.post(endpoint_query.format(database_id=database_id), headers=headers, data=json.dumps(payload))

    // Check the response status
    if (response.status_code == 200){
      data = response.json()
      // Check if any results were found
      if (data.get('results')){
          // A page with the specified problem number exists
          print('A page with the problem number exists.')
          exist = True
        }else{
          // No page with the specified problem number exists
          print('No page with the problem number exists.')
        }
    }
    // Get the response JSON data    
    else {
        // Query request failed
        print('Failed to query pages:', response.json())
      }
    new_record = {
      'parent': {'database_id': database_id},
      'properties': {
          'Title': {'title': [{'text': {'content': bookTitle}}]},
          'Authors': {'text': bookAuthors}
      }
    }
  })
}