// Time
const time = document.querySelector(".time");

function getLoadTime() {
  const date = new Date();
  //   const days = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  time.innerHTML = `
  ${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}
  `;
}

getLoadTime();
setInterval(getLoadTime, 1000);

// Main Function
const input = document.querySelector(".input");
const addBtn = document.querySelector(".add-btn");
const items = document.querySelector(".items");

function onAdd() {
  if (input.value === "") {
    input.focus();
    return;
  }

  const text = input.value;
  const item = createItem(text);
  items.appendChild(item);
  item.scrollIntoView({ block: "center" });

  input.value = "";
  input.focus();
}

let id = 0;
function createItem(text) {
  const item = document.createElement("li");
  item.setAttribute("class", "item");
  item.setAttribute("data-id", id);
  item.innerHTML = `
    <div class="item__left">
        <i class="far fa-check-square"></i>
        <span class="item__name">${text}</span>
    </div>
    <button class="delete-btn">
        <i class="fas fa-minus" data-id="${id}"></i>
    </button>
  `;
  id++;
  return item;
}

addBtn.addEventListener("click", onAdd);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    onAdd();
  }
});

// Delete
items.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});

const deleteAllBtn = document.querySelector(".all-delete-btn");
deleteAllBtn.addEventListener("click", () => {
  items.innerHTML = "";
});

// Toggle
items.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    e.target.classList.toggle("checked");
  }
});
