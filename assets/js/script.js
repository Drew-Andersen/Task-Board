// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Added the JavaScript for the Bootstrap modal from
var formModal = $('formModal')
formModal.on('show.bs.modal', function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget
  // Extract info from data-bs-* attributes
  var recipient = button.getAttribute('data-bs-whatever')
  // Update the modal's content.
  var modalTitle = formModal.querySelector('.modal-title')
  var modalBodyInput = formModal.querySelector('.modal-body input')

  modalBodyInput.value = recipient
})

// Generates a unique 36 character task ID
function generateTaskId() {
    const taskID = crypto.randomUUID();
    return taskID;
}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // Renders the task list from storage
    renderTaskList();

    // Add task event listener
    $('submit-btn').on('click', handleAddTask);

    // Delete task event listener
    $('board').on('click', '.delete', handleDeleteTask);

    // Makes the lanes droppable

    // Creates a date picker
    $( function() {
        $("#task-due-date").datepicker({
            changeMonth: true,
            changeYear: true
        });
      } );

});
