
const tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];

const setTask = () => {
  const text = document.getElementById("taskAdd").value;
  let task = {
    task: text,
    situation: '',
  }

  if (text === '') {
    alert('Digite algo na caixa de texto antes de adicionar a tarefa');
    return
  } else {
    tasksArray.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));

    showScreen();
    document.getElementById("taskAdd").value = '';
  }
}

const removeTask = (index) => {
  const remove = confirm("Deseja deletar esta tarefa?");
  if (remove) {
    tasksArray.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
    showScreen();
  }
}

const taskCheck = (index) => {
  if (tasksArray[index].situation === '') {
    tasksArray[index].situation = 'checked';
  }
  else {
    tasksArray[index].situation = '';
  }
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

const showTask = (task, situation, index) => {
  const item = document.createElement('div');
  item.classList.add('task_item');
  item.innerHTML = `
    <input class = "checkbox" type="checkbox" ${situation} onclick = "taskCheck(${index})">
    <div class="task_content"> ${task} </div>
    <div class="task_icon" onclick="removeTask(${index})"><i class="fas fa-times"></i></div>
  `;
  document.getElementById('taskList').appendChild(item);
}

const cleanScreen = () => {
  const taskList = document.getElementById('taskList');
  while (taskList.firstChild) {
    taskList.removeChild(taskList.lastChild);
  }
}

const showScreen = () => {
  cleanScreen();
  tasksArray.forEach((item, index) => showTask(item.task, item.situation, index));
}

showScreen();
