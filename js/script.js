{
    const tasks = [{
        content: "Zadanie 1",
        done: false,
    },
    {
        content: "Zadanie 2",
        done: false,
    },
    {
        content: "Zadanie 3",
        done: false,
    },
    ];

    const addNewTask = (newTask) => {
        tasks.push({
            content: newTask,
        });
        render();
    };

    const toogleButtonTasks = (index) => {
        tasks[index].done = !tasks[index].done
        render();
    };

    const removeButtonTasks = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const bindButtonTasks = () => {
        const toogleButton = document.querySelectorAll(".js-toogleButton");
        toogleButton.forEach((toogleButton, index) => {
            toogleButton.addEventListener("click", () => {
                toogleButtonTasks(index);
            });
        });

        const removeButton = document.querySelectorAll(".js-removeButton");
        removeButton.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeButtonTasks(index);
            });
        });
    };

    const render = () => {
        let addTextToHtml = "";
        const tasksElement = document.querySelector(".js-tasksList");
        for (const task of tasks) {
            addTextToHtml += `
                <li class="tasksList__item">
                 <button class="tasksListButton tasksListButton--toogle js-toogleButton">
                     ${task.done ? "✔" : ""}
                 </button>
                <span class="${task.done ? "taskDone" : ""}">  
                ${task.content}
                </span>
            <button class="tasksListButton tasksListButton--remove js-removeButton">
                    🗑
                 </button>
            
                </li>
                <hr>
                `
        };

        tasksElement.innerHTML = addTextToHtml;

        // Dodanie wyświetlania ilości zadań do wykonania
        const remainingTasks = tasks.length - tasks.filter(task => task.done).length;
        document.querySelector(".js-stats__item3").innerHTML = `
        Pozostałe zadania: ${remainingTasks}`;


        document.querySelector(".js-stats__item2").innerHTML = `
        Wszystkie zadania: ${tasks.length}`;

        document.querySelector(".js-stats__item").innerHTML = `
        Ukończone zadania: ${tasks.filter(task => task.done).length}`;
        
        bindButtonTasks()
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskElemnt = document.querySelector(".js-newTask");
        const newTask = newTaskElemnt.value.trim();
        if (newTask !== "") {
            addNewTask(newTask);
            newTaskElemnt.value = "";
        }
        newTaskElemnt.focus();
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();

}