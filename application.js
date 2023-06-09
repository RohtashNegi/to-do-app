let taskInput = document.getElementById("New-Task");
let firstButton = document.getElementsByTagName("button")[0];
let incompleteTaskHolder = document.getElementById("incomplete-tasks");
let completedTasksHolder = document.getElementById("completed-tasks");

//new

var CreatingNewElements = function (taskString) {
  var newlist = document.createElement("li");
  var checkBox = document.createElement("input");
  var newLabel = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var cancelButton = document.createElement("button");
  var saveButton = document.createElement("button");
  var deleteButton = document.createElement("button");

  newLabel.innerText = taskString;

  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  cancelButton.innerText = "Cancel";
  cancelButton.className = "cancel";
  saveButton.innerText = "Save";
  saveButton.className = "save";

  newlist.appendChild(checkBox);
  newlist.appendChild(newLabel);
  newlist.appendChild(editInput);
  newlist.appendChild(editButton);
  newlist.appendChild(deleteButton);
  newlist.appendChild(cancelButton);
  newlist.appendChild(saveButton);
  newlist.querySelector("input[type=text]").style.display = "none";
  newlist.querySelector(".cancel").style.display = "none";
  newlist.querySelector(".save").style.display = "none";

  editButton.addEventListener("click", showHide);
  function showHide() {
    const x = newlist.querySelector("input[type=text]");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    newlist.querySelector(".edit").style.display = "none";
    newlist.querySelector(".cancel").style.display = "block";
  }

  saveButton.addEventListener("click", abc);
  function abc() {
    var newlist = this.parentNode;
    var editInput = newlist.querySelector("input[type=text]");
    var newlabel = newlist.querySelector("label");
    newlabel.innerText = editInput.value;
    editInput.value = "";
  }

  editInput.addEventListener("input", editInputTask);
  function editInputTask() {
    var newlist = this.parentNode;
    var editInput = newlist.querySelector("input[type=text]");
    var newlabel = newlist.querySelector("label");
    var compareString = editInput.value.localeCompare(newlabel.innerText);
    if (compareString) {
      newlist.querySelector(".cancel").style.display = "none";
      newlist.querySelector(".save").style.display = "block";
    } else {
      newlist.querySelector(".save").style.display = "none";
      newlist.querySelector(".cancel").style.display = "block";
    }
  }
  // var finalOutput = newLabel.innerText.localeCompare(editInput.value)

  cancelButton.addEventListener("click", cancelButtonShow);
  function cancelButtonShow() {
    const x = newlist.querySelector("input[type=text]");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    newlist.querySelector(".edit").style.display = "block";
    newlist.querySelector(".cancel").style.display = "none";
  }

  return newlist;
};

var addTask = function () {
  if (taskInput.value == "") {
    alert("Please give some input");
  } else {
    var newlist = CreatingNewElements(taskInput.value);

    incompleteTaskHolder.appendChild(newlist);
    bindTaskEvents(newlist, taskCompleted);
  }
  taskInput.value = "";
};

var editTask = function () {
  var newlist = this.parentNode;
  var editInput = newlist.querySelector("input[type=text]");
  var newlabel = newlist.querySelector("label");
  var containsClass = newlist.classList.contains("editMode");
  if (containsClass) {
    newlabel.innerText = editInput.value;
  } else {
    editInput.value = newlabel.innerText;
  }
  newlist.classList.toggle("editMode");
};

// Delete Task

var deleteTask = function () {
  var newlist = this.parentNode;
  // console.log(newlist);
  var ul = newlist.parentNode;
  // console.log(ul);
  ul.removeChild(newlist);
};

// document.querySelector(".delete").addEventListener("click", deleteTask);

//Mark task completed
var taskCompleted = function () {
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

// var ajaxRequest = function () {    why created this function if no use of this function
//   console.log("AJAX Request");
// };

firstButton.addEventListener("click", addTask);
// firstButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  //select ListItems children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
