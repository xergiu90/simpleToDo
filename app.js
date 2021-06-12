loadEvents();
let taskList= [];
let tempInputValue= '';

// load every event in the page
function loadEvents(){
  document.querySelector('form').addEventListener('submit',submit);
  document.getElementById('clear').addEventListener('click',clearList);
  document.querySelector('ul').addEventListener('click',deleteEditOrTick);
  document.querySelector('.filter-input').addEventListener('input',filterElements);
}
// subit data function
function submit(e){
  e.preventDefault();
  let input = document.querySelector('.add-input');
  if(input.value !== ''){
    taskList.push(input.value);
    addTask(input.value);
  }

  input.value = '';
}

// add tasks
function addTask(task){
  let ul = document.querySelector('ul');
  let li = document.createElement('li');
  li.innerHTML = `<label class="container"><div class="task">${task}</div><input type="checkbox"><span class="checkmark"></span></label><span class="edit">EDIT</span><span class="delete">×</span>`;
  ul.appendChild(li);
  document.querySelector('.tasks-board').style.display = 'flex';
  document.querySelector('.no-items').style.display = 'none';
}

//filterElements
function filterElements(e){
  document.querySelector('ul').innerHTML = '';
  if(e.target.value !== '') {
    taskList.forEach(
      item => {
        if(item.includes(e.target.value))
          addTask(item);
      }
    );
  } else {
    taskList.forEach(
      item => addTask(item)
    );
  }
}

// clear the LIST
function clearList(e){
  document.querySelector('ul').innerHTML = '';
  document.querySelector('.tasks-board').style.display = 'none';
  document.querySelector('.no-items').style.display = 'block';
}

// deleteEditTick
function deleteEditOrTick(e){
  if(e.target.className === 'delete')
    deleteTask(e);
  else if(e.target.className === 'edit')
    editTask(e);
  else {
    tickTask(e);
  }
}

// delete task
function deleteTask(e){
  clearList(e);
  taskList = taskList.filter(element => element !== e.target.previousSibling.previousSibling.textContent);
  if(!taskList.length) {
    document.querySelector('.tasks-board').style.display = 'none';
    document.querySelector('.no-items').style.display = 'block';
  } else {
    taskList.forEach(
      task => addTask(task)
    );
  }
  document.querySelector('.filter-input').value= ''
}

function editTask(e){
  let editInput = e.target.previousSibling;

  if( e.target.innerText === 'OK') {
    e.target.innerText= 'EDIT';
    const inputVlaue= editInput.firstChild.value;
    editInput.innerHTML= `<div class="task">${inputVlaue}</div><input type="checkbox"><span class="checkmark"></span>`;
    taskList.splice(taskList.indexOf(tempInputValue), 1, inputVlaue);
  } else {
    e.target.innerText= 'OK';
    const textElem = editInput.innerText;
    tempInputValue = textElem;
    editInput.innerHTML= '<input class="edit-item">';
    editInput.firstChild.value = textElem;
  }
}

// tick a task
function tickTask(e){
  const task = e.target.parentNode;
  if(e.target.checked){
    task.style.textDecoration = "line-through";
    task.style.color = "#ff0000";
  }else {
    task.style.textDecoration = "none";
    task.style.color = "#2f4f4f";
  }
}
