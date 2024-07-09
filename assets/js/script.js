// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// // Added the JavaScript for the Bootstrap modal from
// var formModal = $('formModal')
// formModal.on('show.bs.modal', function (event) {
//   // Button that triggered the modal
//   var button = event.relatedTarget
//   // Extract info from data-bs-* attributes
//   var recipient = button.getAttribute('data-bs-whatever')
//   // Update the modal's content.
//   var modalTitle = formModal.querySelector('.modal-title')
//   var modalBodyInput = formModal.querySelector('.modal-body input')

//   modalBodyInput.value = recipient
// })

function readTasksFromStorage() {
    let storedProjects = JSON.parse(localStorage.getItem("tasks"));
    if (storedProjects !== null) {
        return storedProjects;
    }
    const emptyProject = [];
    return emptyProject;
}

// Generates a unique 36 character task ID
function generateTaskId() {
    const id = crypto.randomUUID();
    return id;
}

// Generates the cards
function createTaskCard(task) {
    // Creates a new task card
    const taskCard = $('<div>');
    taskCard.addClass('card project-card draggable my-3').attr('data-project-id', task.id);
    // Creates a task card header / title
    const cardHeader = $('<div>');
    cardHeader.addClass('card-header h4').text(task.title);
    // Creates the card body div
    const cardBody = $('<div>');
    cardBody.addClass('card-body');
    // Creates the card description
    const cardType = $('<p>');
    cardType.addClass("card-text").text(task.desc);
    // Creates the card due date
    const cardDate = $('<p>');
    cardDate.addClass('card-text').text(task.date);
    // Creates the delete button
    const cardBtn = $('<button>');
    cardBtn.addClass('btn btn-danger delete').text('Delete').attr('data-project-id', task.id);
    cardBtn.on('click', handleDeleteTask);

    // Assigns a color to the card according the the date
    const dueDate = dayjs(task.date, 'M/D/YYYY');
    const currentDate = dayjs();
    // If statement to change the color based on the date
    if (currentDate.isSame(dueDate, 'day')) {
        taskCard.addClass('bg-warning text-light');
        cardBtn.addClass('border-light');
    } else if (currentDate.isAfter(dueDate)) {
        taskCard.addClass('bg-danger text-light');
        cardBtn.addClass('border-light');
    }

    // Appends the card elements to the card and returns the card
    cardBody.append(cardType, cardDate);
    taskCard.append(cardHeader, cardBody, cardBtn);

    return taskCard;
}

function renderTaskList() {
    const projects = readTasksFromStorage();

    // Empties current project cards out of the "swim lanes"
    const toDoList = $('#todo-cards');
    toDoList.empty();

    const inProgress = $('#in-progress-cards');
    inProgress.empty();

    const doneList = $('#done-cards');
    doneList.empty();

    // Loop through the projects and create card for each of the status
    for (let project of projects) {
        if (project.status === "to-do") {
            toDoList.append(createTaskCard(project));
        } else if (project.status === 'in-progress') {
            inProgress.append(createTaskCard(project));
        } else if (project.status === 'done') {
            doneList.append(createTaskCard(project));
        }
    }

    // Make the cards draggable
    $('#draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
    })

    console.log(taskList);
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    // console.log("Working handleAddTask");

    // Retrieve the values of the project-form
    const taskTitle = $('#task-title').val().trim();
    const taskDate = $('#task-due-date').val().trim();
    const taskDesc = $('#task-description').val().trim();
    let id = generateTaskId();

    // Creates a taskCard obect with the form values
    const taskCard = {
        id: id,
        title: taskTitle,
        date: taskDate,
        desc: taskDesc,
        status: "to-do"
    }

    // Append to taskCard to the current taskList
    taskList.push(taskCard);
    // console.log(taskList); // Null

    // Stores the taskList in localStorage and displays to the site
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();

    // Clear the input values
    $('#task-title').val();
    $('#task-due-date').val();
    $('#task-description').val();
    $('#formModal').modal('toggle');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    event.preventDefault();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const projects = taskList;

    // Gets the project ID from the event
    const taskID = ui.draggable[0].dataset.projectId;

    // Gets the ID of the lane that the card was dropped in
    const newStatus = event.target.id;

    // Find the project card bt the id and update the status
    for (project of projects) {
        if (project.id === task.id) {
            project.status = newStatus;
        }
    }

    // Save the new status in localStorage and replace the old one
    localStorage.setItem('tasks', JSON.stringify(projects));
    renderTaskList();
}

$(document).ready(function () {
    // Renders the task list from storage
    renderTaskList();

    // Add task event listener
    $('#submit-btn').on('click', handleAddTask);

    // Delete task event listener
    $('#board').on('click', '.delete', handleDeleteTask);

    // Makes the lanes droppable
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });

    // Creates a date picker
    $( function() {
        $("#task-due-date").datepicker({
            changeMonth: true,
            changeYear: true
        });
      } );

});
