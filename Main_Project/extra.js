const todo = document.querySelector('#todo')
const progress = document.querySelector('#progress')
const done = document.querySelector('#done')
const task_cols = [todo, progress, done]

let dragElement = null
let totalData = JSON.parse(localStorage.getItem('tasks')) || {
  todo: [],
  progress: [],
  done: [],
}

function loadSavedTasks() {
  Object.entries(totalData).forEach(([key, tasks]) => {
    let column = document.querySelector(`#${key}`)
    if (!column) {
      console.log('no col found')
      return
    }
    tasks.forEach((task) => {
      addTask(task.title, task.desc, column)
      console.log('taskadded')
    })
  })
}

loadSavedTasks()
function removeHoverOver() {
  task_cols.forEach((col) => {
    col.classList.remove('hover-over')
  })
}

function addDragEventsOnColumn(col) {
  col.addEventListener('dragenter', function (e) {
    e.preventDefault()
    if (dragElement) {
      col.classList.add('hover-over')
    }
  })
  col.addEventListener('dragover', function (e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  })
  col.addEventListener('dragleave', function (e) {
    if (e.relatedTarget && col.contains(e.relatedTarget)) {
      return
    }
    removeHoverOver()
  })
  col.addEventListener('drop', function (e) {
    e.preventDefault()
    if (!dragElement) return

    col.children[1].appendChild(dragElement)
    removeHoverOver()
    saveToLocalStorage()
  })
}

function addDragEventsOnTask(task) {
  task.addEventListener('drag', (e) => {
    e.preventDefault()
  })
  task.addEventListener('dragstart', (e) => {
    dragElement = task
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', 'task')
  })
  task.addEventListener('dragend', () => {
    dragElement = null
    removeHoverOver()
  })

  task.children[1].children[0].addEventListener('click', function (e) {
    task.remove(task)
    saveToLocalStorage()
  })
}

function addTask(title, desc, col) {
  let tempTask = document.createElement('div')
  tempTask.classList.add('task')
  tempTask.setAttribute('draggable', 'true')
  tempTask.innerHTML = `
              <div class="task-view">
                <h2>${title}</h2>
                <p>${desc}</p>
              </div>
              <div class="actions">
                <button>delete</button>
              </div>`

  col.querySelector('.tasks').prepend(tempTask)
  addDragEventsOnTask(tempTask)
}

function addTaskToDo(title, desc) {
  addTask(title, desc, todo)
  saveToLocalStorage()
}

function saveToLocalStorage() {
  task_cols.forEach(function (col) {
    let tks = Array.from(col.querySelectorAll('.task'))

    totalData[col.id] = tks.map((t) => {
      return {
        title: t.querySelector('h2').textContent,
        desc: t.querySelector('p').textContent,
      }
    })

    totalData[col.id].reverse()
  })
  localStorage.setItem('tasks', JSON.stringify(totalData))
}
task_cols.forEach((col) => {
  addDragEventsOnColumn(col)
})

// ==================================================================
//                    MODAL FUNCTIONALITY
//===================================================================

const modalActivate = document.querySelector('.modal-activate')
const modal = document.querySelector('.modal')
const modalBg = document.querySelector('.bg')

const addTaskBtn = document.querySelector('.modal #addTaskBtn')

modalActivate.addEventListener('click', (e) => {
  modal.classList.add('active')
})

modalBg.addEventListener('click', function (e) {
  modal.classList.remove('active')
})

addTaskBtn.addEventListener('click', function (e) {
  let title = document.querySelector('#title')
  let desc = document.querySelector('#desc')

  addTaskToDo(title.value, desc.value)
  title.value = ''
  desc.value = ''
})
