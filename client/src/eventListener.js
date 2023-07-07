document.addEventListener('DOMContentLoaded', function() {
  
    // Get the button element
    const requestButton = document.getElementById('fetchBook');
    // Add event listener to the button
    requestButton.addEventListener('click', fetchBookInfo);

    const addButton = document.getElementById('add_button');
    addButton.addEventListener('click', addBookToNotion);

  });