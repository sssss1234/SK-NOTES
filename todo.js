(function()
{
    let tasks = [];
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');
    
    console.log('Working');
    async function fetchTodo()
    {
        // //get method
        // fetch('https://jsonplaceholder.typicode.com/todos')
        // .then(function (response)
        // {
        //     return response.json();
        // }).then(function(data){
        //     tasks=data.slice(0,10);
        //     renderList();
        // })
        // .catch(function(error)
        // {
        //     console.log('error',error);
        // })
        try
        {
            const response=await fetch('https://jsonplaceholder.typicode.com/todos');
            const data=await response.json();
            tasks=data.slice(0,10);
            renderList();
        } 
        catch (error) 
        {
            console.log(error);
        }
    }
    
    function addTaskToDOM(task)
    {
        const li=document.createElement('li');
        li.innerHTML=`
              <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
              <label for="${task.id}">${task.title}</label> 
              <img src="delete.png" class="delete" data-id="${task.id}" />
        `;
        taskList.append(li);
    }
    function renderList () {
        taskList.innerHTML='';
        for(let i=0;i<tasks.length;i++)
        {
            addTaskToDOM(tasks[i]);
        }
        tasksCounter.innerHTML=tasks.length;
    }
    
    function toggleTask (taskId) {
        const task=tasks.filter(function(task)
        {
            return task.id===Number(taskId);
        });
        if(task.length>0)
        {
            const currentTask=task[0];
            currentTask.completed=!currentTask.completed;
            renderList();
            showNotification('Task Toggled Successfully');
            return;
        }
        showNotification('Task could not toggled');
    }
    
    
    //Link
    //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    //
    
    
    function deleteTask (taskId) {
        let newTasks=tasks.filter(function(task)
        {
            return task.id!==Number(taskId);
        });
        tasks=newTasks;
        renderList();
        showNotification('Task deleted successfully');
    }
    
    function addTask (task) {
        if(task)
        {
            tasks.push(task);
            renderList();
            showNotification('Task Added Successfully');
            return;
        }
        showNotification('Task can`t be added');
    }
    
    function showNotification(text) {
        alert(text);
    }
    
    function handleInputKeyPress(e)
    {
        if(e.key === 'Enter')
        {
            const text=e.target.value;
            console.log('text',text);
            if(!text)
            {
                showNotification("Please enter the task");
                return;
            }
            const task={
            title:text,
            id: Date.now(),
            completed: false
            };
            e.target,value=' ';
            addTask(task);
        }
    }
    function handleEventListener(e)
    {
        const target=e.target;
        if(target.className==='delete')
        {
            const tasksID=target.dataset.id;
            deleteTask(tasksID);
            return;
        }
        else if(target.className==='custom-checkbox')
        {
            const taskID=target.id;
            toggleTask(taskID);
            return;
        }
    }
    function initalizeApp()
    {
        fetchTodo();
        addTaskInput.addEventListener("keyup",handleInputKeyPress);
        document.addEventListener('click',handleEventListener);
    }
    initalizeApp();
})()
