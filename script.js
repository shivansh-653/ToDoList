const inputBox= document.getElementById('input-box');
const listContainer= document.getElementById('list-container');

function addTask(){
    if(inputBox.value === ''){
        alert('You must write something');
    }
    else{
        let li=document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML="\u00d7";
        li.appendChild(span);
    }
    inputBox.value='';
    saveData(); 
}

listContainer.addEventListener("click",function(element){
    if(element.target.tagName === 'LI'){
        element.target.classList.toggle('checked');
    }
    else if(element.target.tagName === 'SPAN'){
        element.target.parentElement.remove();
    }
    updateTaskOrder();
    saveData();
}, false);

function saveData(){
    localStorage.setItem('data',listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML=localStorage.getItem('data');
}

function updateTaskOrder() {
    const taskList = document.getElementById('list-container');
    const tasks = Array.from(taskList.getElementsByTagName('li'));
  
    // Sort tasks by completion status (unfinished first)
    tasks.sort((a, b) => {
      const isACompleted = a.classList.contains('checked');
      const isBCompleted = b.classList.contains('checked');
  
      if (!isACompleted && isBCompleted) {
        return -1; // Unfinished task comes before completed task
      } else if (isACompleted && !isBCompleted) {
        return 1; // Completed task comes after unfinished task
      } else {
        // If both tasks have the same completion status, maintain original order
        return 0; 
      }
    });
  
    // Re-order tasks in the DOM
    taskList.innerHTML = '';
    tasks.forEach(task => taskList.appendChild(task));
}

showTask();
updateTaskOrder();