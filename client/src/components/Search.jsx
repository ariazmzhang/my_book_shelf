import './App.css';

function Search() {
  return (
    <div className="App">
      <h3>Please input the Book Information you want to add</h3>
      <label for="title">Title:</label>
      <input type="text" id="title">
      </input>
      <label for="authors">Author:</label>
      <input type="text" id="authors"></input>
      <label for="isbn">ISBN:</label>
      <input type="text" id="isbn"></input>
      <button id="fetchBook">Search</button>
  </div>

  );
}