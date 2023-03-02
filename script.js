// mendapatkan elemen HTML
const input = document.querySelector("input");
const ol = document.querySelector("ol");
const addButton = document.getElementById("add-button");
const clearButton = document.getElementById("clear-button");
const emptyButton = document.getElementById("empty-button");
const saveButton = document.getElementById("save-button");

// menambahkan event listener pada tombol "Add"
addButton.addEventListener("click", function (event) {
  // mencegah form submit
  event.preventDefault();

  // validasi textbox tidak kosong
  if (input.value === "") {
    alert("Masukkan To-Do-List terlebih dahulu!");
    return;
  }

  // membuat elemen "li"
  const li = document.createElement("li");

  // menambahkan nilai dari input ke dalam elemen "li"
  li.textContent = input.value;

  // menambahkan elemen "li" ke dalam elemen "ol"
  ol.appendChild(li);

  // menghapus nilai dari input
  input.value = "";

  // menampilkan pop up alert ketika tombol "Add" di klik
  const popup = document.createElement("div");
  popup.textContent = "List berhasil ditambahkan!";
  popup.classList.add("popup");
  document.body.appendChild(popup);

  // menghilangkan pop up alert setelah 2 detik
  setTimeout(function () {
    popup.remove();
  }, 2000);
});

ol.addEventListener("dblclick", function (event) {
  const clickedListItem = event.target;

  // Toggle class "completed" pada list item yang di-klik
  clickedListItem.classList.toggle("completed");
});

clearButton.addEventListener("click", function () {
  // mengambil semua elemen "li" yang memiliki class "completed"
  const completedItems = document.querySelectorAll(".completed");

  // menghapus semua elemen "li" yang memiliki class "completed"
  completedItems.forEach(function (item) {
    item.remove();
  });
});

emptyButton.addEventListener("click", function () {
  // cek apakah ada data di localStorage
  if (localStorage.getItem("todos")) {
    // menghapus semua data dari localStorage
    localStorage.clear();
  }

  // menghapus semua elemen li dari dalam elemen ol
  ol.innerHTML = "";

  // menghapus class "completed" dari semua elemen li yang memiliki class tersebut
  const completedItems = document.querySelectorAll(".completed");
  completedItems.forEach(function (item) {
    item.classList.remove("completed");
  });
});

saveButton.addEventListener("click", function () {
  const todos = [];
  const items = ol.querySelectorAll("li");

  // mengambil nilai dari setiap elemen li dan menambahkannya ke dalam array "todos"
  items.forEach(function (item) {
    todos.push(item.textContent);
  });

  // mengubah array "todos" menjadi string JSON
  const json = JSON.stringify(todos);

  // menyimpan string JSON ke dalam "localStorage" dengan key "todos"
  localStorage.setItem("todos", json);

  // menampilkan pop up alert ketika tombol "Save" di klik
  const popup = document.createElement("div");
  popup.textContent = "List berhasil disimpan!";
  popup.classList.add("popup");
  document.body.appendChild(popup);

  // menghilangkan pop up alert setelah 2 detik
  setTimeout(function () {
    popup.remove();
  }, 2000);
});

window.addEventListener("load", function () {
  // cek apakah ada data di localStorage
  if (localStorage.getItem("todos")) {
    // parse data dari JSON menjadi array
    const todos = JSON.parse(localStorage.getItem("todos"));

    // tambahkan setiap item ke dalam elemen "ol"
    todos.forEach(function (todo) {
      const li = document.createElement("li");
      li.textContent = todo;
      ol.appendChild(li);
    });
  }
});
