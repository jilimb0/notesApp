// if localStorage have no notes we creating object with test note
if (localStorage.getItem("notes") === null) {
  localStorage.setItem("notes", JSON.stringify({ 0: "Test note" }))
}

// reducer to convert array in object
function reducer(accum, currentValue, index) {
  accum[index] = currentValue
  return accum
}

// get notes object from localStorage
const notes = JSON.parse(localStorage.getItem("notes"))

if (notes) {
  // itterating object and rendering notes on the page
  for (key in notes) {
    addNewNote(notes[key], key)
  }
}

// actions with add button
const addBtn = document.getElementById("add")
addBtn.addEventListener("click", () => addNewNote())
// finding last index in our notes object
let lastIndex = Object.keys(notes)[Object.keys(notes).length - 1]

function addNewNote(text = "New note", id = lastIndex ? +lastIndex + 1 : 0) {
  // creating container for note
  const note = document.createElement("div")
  note.classList.add("note")
  note.id = id

  // creating html for note
  note.innerHTML = `
    <header class="tools">
      <button class="save"><i class="fas fa-save"></i></button>
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </header>
    <main class="main" contenteditable="false">${text}</main>
    `

  // getting buttons and main block from note html
  const saveBtn = note.querySelector(".save")
  const editBtn = note.querySelector(".edit")
  const deleteBtn = note.querySelector(".delete")
  const main = note.querySelector(".main")
  // getting note id from html
  let index = note.id

  // actions with buttons
  saveBtn.addEventListener("click", () => {
    // if this note is new, we add new id to it
    index === "undefined"
      ? (notes[++lastIndex] =
          main.textContent.trim() &&
          updateLS("edit", Object.values(notes).reduce(reducer, {})))
      : (notes[index] = main.textContent.trim()) &&
        updateLS("edit", Object.values(notes).reduce(reducer, {}))
  })

  editBtn.addEventListener("click", () => {
    // using contentEditable attribute for editing notes
    main.contentEditable === "true"
      ? (main.contentEditable = false)
      : (main.contentEditable = true)
  })

  deleteBtn.addEventListener("click", () => {
    delete notes[index]
    updateLS("edit", Object.values(notes).reduce(reducer, {}))
  })

  document.body.appendChild(note)
}

// actions with localStorage
function updateLS(action, data) {
  if (action === "edit") localStorage.setItem("notes", JSON.stringify(data))
  if (action === "clear") localStorage.clear()

  document.location.reload()
}
