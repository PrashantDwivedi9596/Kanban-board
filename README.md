::: {align="center"}
# Kanban

**A simple, dark-themed task board built with HTML, CSS, and vanilla
JavaScript.**

Organize tasks, move them between workflow stages, and keep your board
saved in the browser.
:::

------------------------------------------------------------------------

## 📌 Overview

Kanban is a lightweight, front-end task management project inspired by
the Kanban workflow. It provides three columns to track work from start
to completion:

-   **To Do** --- tasks that are waiting to be started.
-   **In Progress** --- tasks currently being worked on.
-   **Done** --- completed tasks.

The project focuses on practicing DOM manipulation, native drag-and-drop
events, browser storage, CSS Flexbox, and custom UI styling without a
framework or backend.

## ✨ Features

-   **Three workflow columns:** To Do, In Progress, and Done.
-   **Add tasks:** Create a task with a title and description using the
    modal.
-   **Drag and drop:** Move task cards between columns.
-   **Delete tasks:** Remove tasks that are no longer needed.
-   **Local persistence:** Tasks are stored in `localStorage`, so they
    remain available after a page reload in the same browser.
-   **Scrollable columns:** Each column can display many tasks without
    expanding beyond its available height.
-   **Dark UI:** A dark color palette, rounded cards, and Poppins
    typography.
-   **Vanilla JavaScript:** No front-end framework is required.

## 🖥️ Preview

The interface contains a top navigation bar with an **Add new task**
button and a board with three columns. Each task card displays its
title, description, and delete button.

> Add a screenshot of your project here when you have one:
>
> `![Kanban project screenshot](./assets/kanban-preview.png)`

## 🧰 Tech Stack

  -----------------------------------------------------------------------
  Technology                          Usage
  ----------------------------------- -----------------------------------
  HTML5                               Page structure and task-board
                                      markup

  CSS3                                Dark theme, layout, modal, task
                                      cards, and scrolling

  JavaScript (ES6+)                   Task creation, deletion,
                                      drag-and-drop, and DOM updates

  `localStorage`                      Persistence across page reloads in
                                      the same browser
  -----------------------------------------------------------------------

## 📁 Project Structure

``` text
kanban/
├── index.html       # Main HTML structure
├── extra.css        # Styles and visual design
├── extra.js         # Task logic and interactions
└── README.md        # Project documentation
```

The filenames above match the HTML references in the project. Keep the
files in the same directory unless you update the stylesheet and script
paths in `index.html`.

## 🚀 Getting Started

### Requirements

A modern browser such as Chrome, Firefox, Edge, or Safari. No package
installation or build step is needed.

### Run locally

1.  Download or clone this repository.
2.  Keep `index.html`, `extra.css`, and `extra.js` together in the
    project directory.
3.  Open `index.html` in your browser.

For a more consistent development workflow, open the folder in Visual
Studio Code and use a local development server extension such as **Live
Server**.

## 📝 How to Use

1.  Open the Kanban board.
2.  Select **Add new task**.
3.  Enter a task title and description, then select **Add Task**.
4.  Drag the task card into **In Progress** when work begins.
5.  Move it into **Done** when it is complete.
6.  Use the **delete** button to remove a task.

Tasks are saved automatically after adding, deleting, or moving them.

## 💾 How Data Persistence Works

The app uses the browser's `localStorage` API. Task information is
serialized as JSON under the key `tasks`.

The stored data follows this general structure:

``` json
{
  "todo": [
    {
      "title": "Learn Flexbox",
      "desc": "Understand flex containers and items"
    }
  ],
  "progress": [],
  "done": []
}
```

### Save flow

1.  The app reads the task cards from each column.
2.  It extracts each card's title and description.
3.  It groups the tasks by column ID: `todo`, `progress`, and `done`.
4.  It serializes the object with `JSON.stringify()` and saves it using
    `localStorage.setItem()`.

### Load flow

1.  On page load, the app reads the `tasks` value using
    `localStorage.getItem()`.
2.  `JSON.parse()` converts the stored JSON back into a JavaScript
    object.
3.  The app recreates the task cards and attaches their event listeners.

**Important:** `localStorage` is browser- and origin-specific. Clearing
browser storage or using a different browser/profile may remove or hide
the saved board. This project does not sync tasks between devices.

## 🧲 Drag-and-Drop Notes

The board uses native HTML Drag and Drop API events:

-   `dragstart` identifies the task being dragged.
-   `dragover` calls `preventDefault()` so a column can accept a drop.
-   `drop` appends the dragged task to the destination column.
-   `dragend` clears the active dragged-task reference and removes hover
    styling.

The destination column's `.tasks` container receives the card, and the
board is saved again so the new column assignment persists after reload.

## 📜 CSS Layout and Scrolling Notes

Each `.task-column` is a vertical flex container. Its heading remains at
the top, while `.tasks` occupies the remaining space and handles
vertical overflow.

The key pattern is:

``` css
.task-column {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tasks {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.task {
  flex-shrink: 0;
}
```

Why these properties matter:

-   `display: flex` and `flex-direction: column` create a vertical
    column layout.
-   `flex: 1` lets `.tasks` use the remaining available height.
-   `min-height: 0` allows the scroll container to shrink within its
    flex parent.
-   `overflow-y: auto` enables scrolling when content exceeds the
    available height.
-   `flex-shrink: 0` prevents task cards from compressing to fit the
    column, allowing the content to overflow and become scrollable.

If the scrollbar is hidden with browser-specific CSS, scrolling may
still work, but the scrollbar will not be visible.

## 🧠 Concepts Practiced

-   Selecting elements with `querySelector()` and `querySelectorAll()`.
-   Creating and updating DOM elements with `createElement()`,
    `appendChild()`, and `textContent`.
-   Handling click and drag-and-drop events.
-   Using arrays and objects to organize task data.
-   Converting data to and from JSON.
-   Persisting state with `localStorage`.
-   Building layouts with Flexbox.
-   Managing overflow and scrollable regions.
-   Keeping the DOM and stored data synchronized.

## ⚠️ Current Limitations

-   Tasks are stored only in the current browser's local storage; there
    is no account system, server, or cross-device synchronization.
-   The board currently uses a fixed set of three workflow columns.
-   There is no task editing, due-date, priority, search, or filtering
    feature yet.
-   Browser storage can be cleared by the user or browser settings.

## 🛣️ Possible Improvements

-   Edit existing tasks.
-   Add task priority, due dates, and labels.
-   Display live task counts in each column.
-   Add search and filtering.
-   Improve mobile and tablet layouts.
-   Add confirmation before deleting a task.
-   Support keyboard-accessible alternatives to drag-and-drop.
-   Add export/import for task data.
-   Add a backend and authentication for multi-device synchronization.

## 🤝 Contributing

Suggestions and improvements are welcome.

1.  Fork the repository.
2.  Create a branch for your change.
3.  Make and test your changes in a browser.
4.  Open a pull request describing the improvement.

## 📄 License

No license has been specified yet. Add a `LICENSE` file and update this
section before distributing the project for reuse.

------------------------------------------------------------------------

::: {align="center"}
**Built with HTML, CSS, and JavaScript.**
:::
