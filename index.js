const myForm = document.getElementById("main-form");
const taskList = document.getElementById("todo-list");

const addNewTodo = () => {
  const newTodo = document.getElementById("new-todo").value;
  const text = `
      <div class="task-item">
        <li> ${newTodo} </li>
        <div>
          <form>
            <label>completed </label>
            <input class="completed" type="checkbox" />
          </form>
          <button class="edit" type="submit"> EDIT </button>
          <button class="delete-task-btn" type="submit"> DELETE </button>
        </div>
      </div>
    `;
  taskList.insertAdjacentHTML("beforeend", text);
  document.getElementById("new-todo").value = "";
};

myForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addNewTodo();
  console.log(myForm.value);
});

taskList.addEventListener("click", function (e) {
  const item = e.target;
  // delete todo
  if (item.classList[0] === "delete-task-btn") {
    let todo = item.parentElement.parentElement;
    todo.remove();
    // set todo as completed
  } else if (item.classList[0] === "completed") {
    if (item.checked) {
      item.closest(".task-item").children[0].classList.add("completed");
    } else {
      item.closest(".task-item").children[0].classList.remove("completed");
    }
    // update todo
  } else if (item.classList[0] === "edit") {
    editPlaceholderText = item.closest(".task-item").children[0].innerText;
    editInput = `
          <form id="update-todo-form">
            <input id="edit-text" type="text" value="${editPlaceholderText}"/>
            <button> confirm update </button>
          </form>
        `;
    const originalListItem = item.closest(".task-item");
    originalListItem.children[0].classList.add("hide");
    originalListItem.insertAdjacentHTML("afterbegin", editInput);
    const editForm = document.getElementById("update-todo-form");
    editForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const editedTodo = document.getElementById("edit-text");
      originalListItem.children[0].innerText = editedTodo.value;
      originalListItem.classList.remove("hide");
    });
  }
});
