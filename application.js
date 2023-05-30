var taskInput = document.getElementById("New-Task");
var firstButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var CreatingNewElements = function (taskString) {
  var newlist = document.createElement("li");
  var checkBox = document.createElement("input");
  var newLabel = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");

  newLabel.innerText = taskString;

  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  newlist.appendChild(checkBox);
  newlist.appendChild(newLabel);
  newlist.appendChild(editInput);
  newlist.appendChild(editButton);
  newlist.appendChild(deleteButton);

  return newlist;
};

var addTask = function () {
  if (taskInput.value == "") {
    alert("Please give some input");
  } else {
    var newlist = CreatingNewElements(taskInput.value);

    incompleteTaskHolder.appendChild(newlist);
    // bindTaskEvents(newlist, taskCompleted);  // use of bindTaskEvents
  }
  taskInput.value = "";
};
firstButton.addEventListener("click", addTask);

var editTask = function () {
  var newlist = this.parentElement; // this keyword refering to ?

  var editInput = newlist.querySelector("input[type=text]");
  var newlabel = newlist.querySelector("label");
  var containsClass = newlist.classList.contains("editMode");
  if (containsClass) {
    newlabel.innerText = editInput.value;
  } else {
    editInput.value = newlabel.innerText;
  }
  newlist.classList.toggle("editMode");
  //   incompleteTaskHolder.appendChild(newlist);
};
var editButton = document.querySelector("button.edit");
editButton.onclick = editTask;
