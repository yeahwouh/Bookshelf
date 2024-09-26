let myLibrary = [];

let book_id = 0;
function Book([title, fiction, author, genres, date_s, date_f, rating]) {
    // the constructor...
    this.title = title;
    this.fiction = fiction;
    this.author = author;
    this.genres = genres;
    this.date_s = date_s;
    this.date_f = date_f;
    this.rating = rating;
    // Auto incrementing book_id
    book_id += 1;
    this.id = book_id;
    this.read = false;
}



const tableHead = document.querySelector('thead')
let tableBody = document.querySelector('tbody')
let table = document.querySelector("table")

function openForm() { //Called when the "NEW Button is clicked
    tableHead.remove();
    tableBody.remove();
    createForm();
}

function addBookToTable(){
    // Create a new Row containing the last book added to the library
    let lastBookIndex = myLibrary.length -1;
    appendRow(lastBookIndex);
}

function appendRow(myLibIndex) {
    let newBook = myLibrary[myLibIndex]
    let newRow = document.createElement("tr");
    // Deleting the id and the "read status" to make sure it doesn't show up in the table
    let id = newBook["id"];
    delete newBook["id"];
    let read = newBook["read"];
    delete newBook["read"];

    // Appending the individual features
    for (let feature in newBook) {
        let cell = document.createElement("td");
        let dataPoint = document.createElement("p")
        // newBook is an object...
        dataPoint.textContent = newBook[feature];

        cell.appendChild(dataPoint);
        newRow.appendChild(cell);
    }

    // Adding the read and delete buttons
    let buttonCell = document.createElement("td");
    buttonCell.classList.add("buttonCell");
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function(){
        // Deleting the object from myLibrary
        myLibrary = myLibrary.filter((book)=> book.id !== id)
        // Deleting the table body
        tableBody.remove()
        tableBody = document.createElement("tbody");
        // Appending every book to the table again
        for (let i = 0; i<myLibrary.length; i++) {
            appendRow(i);
        }
        table.appendChild(tableBody);
    }

    let readButton = document.createElement("button");
    readButton.textContent = "Change read status";

    buttonCell.appendChild(deleteButton);
    buttonCell.appendChild(readButton);
    newRow.appendChild(buttonCell);

    // Append newRow
    tableBody.appendChild(newRow);

    // Re appending the id and the read status
    newBook["id"] = id;
    newBook["read"] = read;
}

function addBookToLibrary() {
    // Append book to the library based on formData
    const formData = new FormData(form);
    let bookFeatures = [];
    for (let item of formData) {
        bookFeatures.push(item[1]);
    }
    let newBook = new Book(bookFeatures)
    myLibrary.push(newBook);
}

let form;

function createForm() {
    // Creating the form
    form = document.createElement('form');
    form.id = 'bookForm';

    // Book Title
    let labelTitle = document.createElement('label');
    labelTitle.setAttribute('for', 'bookTitle');
    labelTitle.textContent = 'Book Title:';
    form.appendChild(labelTitle);
    form.appendChild(document.createElement('br'));

    let inputTitle = document.createElement('input');
    inputTitle.type = 'text';
    inputTitle.id = 'bookTitle';
    inputTitle.name = 'bookName';
    inputTitle.required = true;
    form.appendChild(inputTitle);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));

    // Fiction or Not
    let labelFiction = document.createElement('label');
    labelFiction.setAttribute('for', 'fiction');
    labelFiction.textContent = 'Is it Fiction?';
    form.appendChild(labelFiction);
    form.appendChild(document.createElement('br'));

    let inputFictionYes = document.createElement('input');
    inputFictionYes.type = 'radio';
    inputFictionYes.id = 'fictionYes';
    inputFictionYes.name = 'fiction';
    inputFictionYes.value = 'Yes';
    inputFictionYes.required = true;
    form.appendChild(inputFictionYes);
    let labelFictionYes = document.createElement('label');

    labelFictionYes.setAttribute('for', 'fictionYes');
    labelFictionYes.textContent = 'Yes';
    form.appendChild(labelFictionYes);
    form.appendChild(document.createElement('br'));
    let inputFictionNo = document.createElement('input');

    inputFictionNo.type = 'radio';
    inputFictionNo.id = 'fictionNo';
    inputFictionNo.name = 'fiction';
    inputFictionNo.value = 'No';
    form.appendChild(inputFictionNo);
    let labelFictionNo = document.createElement('label');

    labelFictionNo.setAttribute('for', 'fictionNo');
    labelFictionNo.textContent = 'No';
    form.appendChild(labelFictionNo);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));

    // Author
    let labelAuthor = document.createElement('label');
    labelAuthor.setAttribute('for', 'author');
    labelAuthor.textContent = 'Author:';
    form.appendChild(labelAuthor);
    form.appendChild(document.createElement('br'));
    let inputAuthor = document.createElement('input');

    inputAuthor.type = 'text';
    inputAuthor.id = 'author';
    inputAuthor.name = 'author';
    inputAuthor.required = true;
    form.appendChild(inputAuthor);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));

    // Genres
    let labelGenres = document.createElement('label');
    labelGenres.setAttribute('for', 'genres');
    labelGenres.textContent = 'Genres (comma separated):';
    form.appendChild(labelGenres);
    form.appendChild(document.createElement('br'));
    let inputGenres = document.createElement('input');

    inputGenres.type = 'text';
    inputGenres.id = 'genres';
    inputGenres.name = 'genres';
    inputGenres.required = true;
    form.appendChild(inputGenres);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));

    // Date Started
    let labelDateStarted = document.createElement('label');
    labelDateStarted.setAttribute('for', 'dateStarted');
    labelDateStarted.textContent = 'Date Started:';
    form.appendChild(labelDateStarted);
    form.appendChild(document.createElement('br'));
    let inputDateStarted = document.createElement('input');

    inputDateStarted.type = 'date';
    inputDateStarted.id = 'dateStarted';
    inputDateStarted.name = 'dateStarted';
    inputDateStarted.required = true;
    form.appendChild(inputDateStarted);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));

    // Date Finished
    let labelDateFinished = document.createElement('label');
    labelDateFinished.setAttribute('for', 'dateFinished');
    labelDateFinished.textContent = 'Date Finished:';
    form.appendChild(labelDateFinished);
    form.appendChild(document.createElement('br'));

    let inputDateFinished = document.createElement('input');
    inputDateFinished.type = 'date';
    inputDateFinished.id = 'dateFinished';
    inputDateFinished.name = 'dateFinished';
    form.appendChild(inputDateFinished);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));

    // Rating
    let labelRating = document.createElement('label');
    labelRating.setAttribute('for', 'rating');
    labelRating.textContent = 'Rating (1 to 10 stars):';
    form.appendChild(labelRating);
    form.appendChild(document.createElement('br'));

    let inputRating = document.createElement('input');
    inputRating.type = 'number';
    inputRating.id = 'rating';
    inputRating.name = 'rating';
    inputRating.min = '1';
    inputRating.max = '10';
    form.appendChild(inputRating);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));

    // Submit Button
    let submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    form.appendChild(submitButton);


    // Append form to the container
    let container = document.querySelector(".container");
    container.appendChild(form);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addBookToLibrary(form);
        addBookToTable();
        form.remove();
        table.appendChild(tableHead);
        table.appendChild(tableBody);
    })
}

