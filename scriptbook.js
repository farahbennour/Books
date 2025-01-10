document.getElementById("book-form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const isbn = document.getElementById("isbn").value.trim();
  
    if (!title || !author || !isbn) {
        showToast("Please fill in all fields", "warning");
        return;
    }
  
    addBook(title, author, isbn);
  
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  
    showToast("Book added successfully!", "success");
});

function addBook(title, author, isbn) {
    const newBook = {
        title,
        author,
        isbn,
    };

    const books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
}

document.addEventListener("DOMContentLoaded", () => {
    displaybookList();
});

function displaybookList() {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const bookList = document.getElementById("body");
    bookList.innerHTML = "";
  
    books.forEach((book, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteBook(${index})">Delete</button>
        </td>`;
        bookList.appendChild(row);
        showToast("Book Added successfully!", "success");
    });
}

function deleteBook(index) {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    if (confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) {
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        displaybookList();
        showToast("Book deleted successfully!", "danger");
    }
}

function showToast(message, type) {
    const toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
        const container = document.createElement("div");
        container.id = "toast-container";
        container.style.position = "fixed";
        container.style.top = "20px";
        container.style.right = "20px";
        container.style.zIndex = "9999";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.style.padding = "10px 20px";
    toast.style.marginBottom = "10px";
    toast.style.color = "#fff";
    toast.style.borderRadius = "5px";
    toast.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    toast.style.backgroundColor =
        type === "success" ? "green" : type === "warning" ? "orange" : "red";

    toast.innerText = message;

    document.getElementById("toast-container").appendChild(toast);

    // setTimeout(() => {
    //     toast.remove();
    // }, 3000);
}
