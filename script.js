const todo = document.querySelector('#todo')
const progress = document.querySelector('#progress')
const done = document.querySelector('#done')
const cols = document.querySelectorAll('.task-column')
const tasks = document.querySelectorAll('.task')
let storedTasks = localStorage.getItem('tasks')
let taskData = {}

let dragElement = null
let dragPreview = null
function previewOldTasks() {
  if (!storedTasks) {
    return
  }
  storedTasks = Array.from(JSON.parse(storedTasks))
  storedTasks.forEach((t) => {
    addNewTask(t.title, t.desc)
  })
}
previewOldTasks()
updateColCount()

tasks.forEach((task) => {
  task.addEventListener('drag', (e) => {
    e.preventDefault()
  })

  task.addEventListener('dragstart', (e) => {
    dragElement = task
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', 'task')

    const rect = task.getBoundingClientRect()

    // Create a separate, fully styled drag preview
    const preview = task.cloneNode(true)

    preview.style.cssText = `
    position: fixed;
    top: 0;
    left: -10000px;
    width: ${rect.width}px;
    height: ${rect.height}px;
    box-sizing: border-box;
    opacity: 1;
    background: #2b2c30;
    color: rgb(218, 218, 218);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px;
    pointer-events: none;
    transform: none;
    filter: none;
  `

    document.body.appendChild(preview)

    e.dataTransfer.setDragImage(
      preview,
      e.clientX - rect.left,
      e.clientY - rect.top,
    )

    // Remove only the temporary preview after the browser captures it
    requestAnimationFrame(() => preview.remove())
  })

  task.addEventListener('dragend', () => {
    dragElement = null

    dragPreview?.remove()
    dragPreview = null

    cols.forEach((col) => {
      col.classList.remove('hover-over')
    })
  })
})

cols.forEach((col) => {
  addDragEventsOnColumn(col)
})

function addDragEventsOnColumn(column) {
  column.addEventListener('dragenter', function (e) {
    e.preventDefault()
    if (dragElement) {
      column.classList.add('hover-over')
    }
  })
  column.addEventListener('dragover', function (e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  })
  column.addEventListener('dragleave', function (e) {
    // Avoid removing the highlight when entering a child element
    if (e.relatedTarget && column.contains(e.relatedTarget)) {
      return
    }

    column.classList.remove('hover-over')
  })
  column.addEventListener('drop', function (e) {
    e.preventDefault()
    if (!dragElement) return

    // Move the task into the target column
    column.appendChild(dragElement)
    column.classList.remove('hover-over')

    console.log('Task moved to:', column.id)

    //updating cols count
    updateColCount()

    //updating the data
    saveToLocal()
  })
}

function updateColCount() {
  cols.forEach((col) => {
    const count = col.children[0].children[1]
    count.textContent = col.childElementCount - 1
  })
}
function addNewTask(title, desc) {
  const h2 = document.createElement('h2')
  h2.textContent = title

  const p = document.createElement('p')
  p.textContent = desc

  const btn = document.createElement('button')
  btn.textContent = 'delete'

  let tk = document.createElement('div')
  tk.classList.add('task')
  tk.setAttribute('draggable', 'true')
  tk.append(h2)
  tk.append(p)
  tk.append(btn)
  console.log(tk)

  todo.append(tk)

  tk.addEventListener('drag', (e) => {
    dragElement = tk
  })

  btn.addEventListener('click', function (e) {
    this.parentElement.remove(tk)
  })

  //updating the col count after each drag-drop event;
  updateColCount()

  //saving the task to local storage
  saveToLocal()
}

function saveToLocal() {
  cols.forEach((col) => {
    let tasks = Array.from(col.querySelectorAll('.task'))
    taskData[col.id] = tasks.map((t) => {
      return {
        title: t.querySelector('h2').textContent,
        desc: t.querySelector('p').textContent,
      }
    })
  })

  localStorage.setItem('tasks', JSON.stringify(taskData))
  console.log(taskData)
}

// Modal Logic
const toggleModal = document.querySelector('.toggle-modal')
const modal = document.querySelector('.modal')
const modalBg = document.querySelector('.bg')
const addTask = document.querySelector('.add-task-btn')

toggleModal.addEventListener('click', (e) => {
  modal.classList.add('active')
  e.target.textContent =
    e.target.textContent === 'Cancel' ? 'Add new task' : 'Cancel'
})

modalBg.addEventListener('click', (e) => {
  modal.classList.remove('active')
  toggleModal.textContent = 'Add new task'
})

addTask.addEventListener('click', (e) => {
  const taskTitle = document.querySelector('#task-title').value
  const taskDesc = document.querySelector('#task-description').value
  console.log('adding task')
  addNewTask(taskTitle, taskDesc)
  modal.classList.remove('active')
  toggleModal.textContent = 'Add new task'
})
