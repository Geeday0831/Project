document.addEventListener('DOMContentLoaded', function() {

    // Cache DOM elements for later use
    const addTaskBtn = document.querySelector('.add-task-btn');
    const modal = document.getElementById('add-task-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const taskForm = document.getElementById('task-form');
    const taskList = document.querySelector('.task-list');
    
    // Open the modal when the "Add Task" button is clicked
    addTaskBtn.addEventListener('click', function() {
      modal.style.display = 'flex';
    });
  
    // Close the modal when the "Cancel" button is clicked
    closeModalBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  
    // Close modal if clicked outside the modal content
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  
    // Handle the task form submission
    taskForm.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      const taskName = document.getElementById('task-name').value;
      const taskDesc = document.getElementById('task-desc').value;
      const taskDueDate = document.getElementById('task-due-date').value;
      const taskPriority = document.getElementById('task-priority').value;
      const taskCategory = document.getElementById('task-category').value;
  
      // Prepare task data
      const taskData = {
        name: taskName,
        description: taskDesc,
        dueDate: taskDueDate,
        priority: taskPriority,
        category: taskCategory,
        completed: false
      };
  
      try {
        // Send the new task to the backend API
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(taskData)
        });
  
        if (response.ok) {
          const newTask = await response.json();
          addTaskToList(newTask);
          modal.style.display = 'none'; // Close the modal after submitting
          taskForm.reset(); // Reset form fields
        } else {
          alert('Failed to add task');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong');
      }
    });
  
    // Function to dynamically add a task to the list
    function addTaskToList(task) {
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');
      taskItem.innerHTML = `
        <h2>${task.name}</h2>
        <p>Due: <span class="due-date">${task.dueDate}</span></p>
        <p>Priority: <span class="priority">${task.priority}</span></p>
        <p>Category: <span class="category">${task.category}</span></p>
        <button class="mark-complete" data-id="${task._id}">Mark as Complete</button>
      `;
      taskList.appendChild(taskItem);
  
      // Add event listener for "Mark as Complete" button
      const markCompleteBtn = taskItem.querySelector('.mark-complete');
      markCompleteBtn.addEventListener('click', function() {
        markTaskComplete(task._id);
      });
    }
  
    // Function to mark a task as complete
    async function markTaskComplete(taskId) {
      try {
        const response = await fetch(`/api/tasks/${taskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ completed: true })
        });
  
        if (response.ok) {
          const updatedTask = await response.json();
          const taskItem = document.querySelector(`[data-id="${taskId}"]`).parentElement;
          taskItem.querySelector('.priority').textContent = 'Completed';
          taskItem.querySelector('.mark-complete').disabled = true;
        } else {
          alert('Failed to mark task as complete');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong');
      }
    }
  
    // Load tasks when the page is loaded
    async function loadTasks() {
      try {
        const response = await fetch('/api/tasks');
        if (response.ok) {
          const tasks = await response.json();
          tasks.forEach(task => addTaskToList(task));
        } else {
          alert('Failed to load tasks');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong');
      }
    }
  
    // Call loadTasks to fetch and display tasks on page load
    loadTasks();
  
  });
  