document.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.getElementById("addTaskBtn");
    const searchButton = document.getElementById("searchButton");
    const homeButton = document.getElementById("homeButton");

    const upcomingTasks = document.getElementById("upcomingTasks");
    const overdueTasks = document.getElementById("overdueTasks");
    const completedTasks = document.getElementById("completedTasks");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => ({
        ...task,
        dueDate: new Date(task.dueDate)
    }));

    const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };

    function addTask() {
        const title = document.getElementById("taskTitle").value.trim();
        const description = document.getElementById("taskDescription").value.trim();
        const dueDateValue = document.getElementById("taskDueDate").value;
        const priority = document.getElementById("taskPriority").value;

        if (!title || !description || !dueDateValue || !priority) {
            alert("Please fill in all fields before adding a task.");
            return;
        }

        const task = {
            title,
            description,
            dueDate: new Date(dueDateValue),
            priority,
            completed: false
        };

        tasks.push(task);
        saveTasksToLocalStorage();
        renderTasks();
        clearForm();
    }

    function renderTasks() {
        upcomingTasks.innerHTML = '';
        overdueTasks.innerHTML = '';
        completedTasks.innerHTML = '';

        tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

        tasks.forEach((task, index) => {
            const taskElement = createTaskElement(task, index);

            if (task.completed) {
                completedTasks.appendChild(taskElement);
            } else if (task.dueDate < new Date()) {
                overdueTasks.appendChild(taskElement);
            } else {
                upcomingTasks.appendChild(taskElement);
            }
        });

        toggleNoTaskMessage(tasks.length === 0);
        showHomeButton(false); 
    }

    function createTaskElement(task, index) {
        const taskElement = document.createElement("li");
        taskElement.classList.add("task");
    
       
        taskElement.innerHTML = `
            <div class="task-info">
                <span class="task-title">${task.title} - ${task.dueDate.toDateString()}</span>
                <span class="arrow-icon">&#9654;</span> <!-- Arrow icon positioned after the title -->
            </div>
            <div class="task-description">${task.description}</div>
            <span class="priority-label ${task.priority.toLowerCase()}-priority">${task.priority}</span>
            <div class="task-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <button class="${task.completed ? 'undo-btn' : 'complete-btn'}">${task.completed ? 'Undo' : 'Complete'}</button>
            </div>
        `;
    
       
        const arrowIcon = taskElement.querySelector(".arrow-icon");
        const taskDescription = taskElement.querySelector(".task-description");
    
        
        taskDescription.style.display = "none";
    
       
        arrowIcon.addEventListener("click", () => {
            const isVisible = taskDescription.style.display === "block";
            taskDescription.style.display = isVisible ? "none" : "block";
            arrowIcon.classList.toggle("expanded", !isVisible);
        });
    
        
        taskElement.querySelector(".edit-btn").onclick = () => startInlineEdit(taskElement, task, index);
        taskElement.querySelector(".delete-btn").onclick = () => deleteTask(index);
        taskElement.querySelector(".complete-btn, .undo-btn").onclick = () => toggleComplete(index);
    
        return taskElement;
    }    


    function toggleNoTaskMessage(show) {
        const noTaskMessage = document.getElementById("noTaskMessage");
        noTaskMessage.style.display = show ? "block" : "none";
    }

    function showHomeButton(shouldShow) {
        homeButton.style.display = shouldShow ? "block" : "none";
    }

    function applySearchAndFilter() {
        const searchText = document.getElementById("searchBox").value.toLowerCase();
        const filterPriority = document.getElementById("filterPriority").value;
        const filterStatus = document.getElementById("filterStatus").value;

        const filteredTasks = tasks.filter(task => {
            const matchesText = task.title.toLowerCase().includes(searchText);
            const matchesPriority = filterPriority === "All" || task.priority === filterPriority;
            const matchesStatus = 
                filterStatus === "All" ||
                (filterStatus === "Completed" && task.completed) ||
                (filterStatus === "Upcoming" && !task.completed && task.dueDate >= new Date()) ||
                (filterStatus === "Overdue" && !task.completed && task.dueDate < new Date());

            return matchesText && matchesPriority && matchesStatus;
        });

        renderFilteredTasks(filteredTasks);
        showHomeButton(true); 
        toggleNoTaskMessage(filteredTasks.length === 0);
    }

    function renderFilteredTasks(filteredTasks) {
        upcomingTasks.innerHTML = '';
        overdueTasks.innerHTML = '';
        completedTasks.innerHTML = '';

        filteredTasks.forEach((task, index) => {
            const taskElement = createTaskElement(task, index);
            if (task.completed) {
                completedTasks.appendChild(taskElement);
            } else if (task.dueDate < new Date()) {
                overdueTasks.appendChild(taskElement);
            } else {
                upcomingTasks.appendChild(taskElement);
            }
        });
    }

    function clearForm() {
        document.getElementById("taskTitle").value = '';
        document.getElementById("taskDescription").value = '';
        document.getElementById("taskDueDate").value = '';
        document.getElementById("taskPriority").value = '';
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function startInlineEdit(taskElement, task, index) {
        const existingForm = document.getElementById("inlineEditForm");
        if (existingForm) existingForm.remove();

        const formContainer = document.createElement("div");
        formContainer.classList.add("edit-form-container");

        const inlineForm = document.createElement("div");
        inlineForm.id = "inlineEditForm";
        inlineForm.innerHTML = `
            <div class="form-row">
                <label for="editTitle">Title</label>
                <input type="text" id="editTitle" value="${task.title}">
            </div>
            <div class="form-row">
                <label for="editDescription">Description</label>
                <textarea id="editDescription">${task.description}</textarea>
            </div>
            <div class="form-row">
                <label for="editDueDate">Due Date</label>
                <input type="date" id="editDueDate" value="${task.dueDate.toISOString().split('T')[0]}">
            </div>
            <div class="form-row">
                <label for="editPriority">Priority</label>
                <select id="editPriority">
                    <option value="High" ${task.priority === 'High' ? 'selected' : ''}>High</option>
                    <option value="Medium" ${task.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                    <option value="Low" ${task.priority === 'Low' ? 'selected' : ''}>Low</option>
                </select>
            </div>
            <div class="button-row">
                <button id="saveEditBtn">Save</button>
                <button id="cancelEditBtn">Cancel</button>
            </div>
        `;

        formContainer.appendChild(inlineForm);
        taskElement.querySelector(".edit-btn").after(formContainer);

       
        taskElement.classList.add("hide-buttons");

        document.getElementById("saveEditBtn").onclick = () => saveInlineEdit(index, taskElement);
        document.getElementById("cancelEditBtn").onclick = () => cancelInlineEdit(taskElement);
    }

    function saveInlineEdit(index, taskElement) {
        tasks[index].title = document.getElementById("editTitle").value;
        tasks[index].description = document.getElementById("editDescription").value;
        tasks[index].dueDate = new Date(document.getElementById("editDueDate").value);
        tasks[index].priority = document.getElementById("editPriority").value; 

        saveTasksToLocalStorage();
        renderTasks();

        
        cancelInlineEdit(taskElement);
    }

    function cancelInlineEdit(taskElement) {
        const existingForm = document.getElementById("inlineEditForm");
        if (existingForm) existingForm.parentElement.remove();

      
        taskElement.classList.remove("hide-buttons");
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasksToLocalStorage();
        renderTasks();
    }

    function deleteTask(index) {
        if (confirm("Are you sure you want to delete this task?")) {
            tasks.splice(index, 1);
            saveTasksToLocalStorage();
            renderTasks();
        }
    }

    addTaskBtn.addEventListener("click", addTask);
    searchButton.addEventListener("click", applySearchAndFilter);
    homeButton.addEventListener("click", () => {
        showHomeButton(false); 
        renderTasks(); 
    });

    renderTasks(); 
});