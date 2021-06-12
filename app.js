loadEvents();
let taskList= [];

// load every event in the page
function loadEvents(){
  document.querySelector('form').addEventListener('submit',submit);
  document.getElementById('clear').addEventListener('click',clearList);
  document.querySelector('ul').addEventListener('click',deleteOrTick);
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
  li.innerHTML = `<label class="container">${task}<input type="checkbox"><span class="checkmark"></span></label><span class="delete">×</span>`;
  ul.appendChild(li);
  document.querySelector('.tasks-board').style.display = 'flex';
  document.querySelector('.no-items').style.display = 'none';
}

//filterElements
function filterElements(e){
  document.querySelector('ul').innerHTML = '';
  if(e.target.value !== '') {
    console.log(taskList)
    taskList.forEach(
      item => {
        console.log(item);
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

// deleteTick
function deleteOrTick(e){
  if(e.target.className === 'delete')
    deleteTask(e);
  else {
    tickTask(e);
  }
}

// delete task
function deleteTask(e){
  let remove = e.target.parentNode;
  let parentNode = remove.parentNode;
  taskList = taskList.filter(element => element !== e.target.previousSibling.textContent);
  parentNode.removeChild(remove);

  if(!taskList.length) {
    document.querySelector('.tasks-board').style.display = 'none';
    document.querySelector('.no-items').style.display = 'block';
  } else {
    taskList.forEach(
      item => addTask(item)
    );
  }
  document.querySelector('.filter-input').value= ''
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
