// Get references to elements
const monthYearEl = document.getElementById("month-year");
const datesEl = document.querySelector(".dates");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("new-month");

// Start with today's date
let currentDate = new Date();

// Render the calendar
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get month name + year
  monthYearEl.textContent = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Find first day of this month (weekday index)
  const firstDay = new Date(year, month, 1).getDay();

  // Find last date of this month
  const lastDate = new Date(year, month + 1, 0).getDate();

  // Find last date of previous month
  const prevLastDate = new Date(year, month, 0).getDate();

  // Store today info
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // Build HTML
  let daysHTML = "<ul>";

  // Fill in previous month dates
  for (let i = firstDay; i > 0; i--) {
    daysHTML += `<li class="prev-date">${prevLastDate - i + 1}</li>`;
  }

  // Fill in current month dates
  for (let d = 1; d <= lastDate; d++) {
    let isToday =
      d === todayDate && month === todayMonth && year === todayYear
        ? "today"
        : "";
    daysHTML += `<li class="day ${isToday} " data-day="${d}">${d}</li>`;
  }

  // Fill in next month dates (to complete the grid)
  const totalCells = firstDay + lastDate;
  const nextDays = 7 - (totalCells % 7 === 0 ? 7 : totalCells % 7);
  for (let i = 1; i <= nextDays; i++) {
    daysHTML += `<li class="next-date">${i}</li>`;
  }

  daysHTML += "</ul>";

  // Inject into DOM
  datesEl.innerHTML = daysHTML;

  // Add click handlers for current month days
  document.querySelectorAll(".day").forEach((dayEl) => {
    dayEl.addEventListener("click", () => {
      const day = dayEl.dataset.day;
      alert(
        `You clicked ${day} ${currentDate.toLocaleString("default", { month: "long" })} ${year}`,
      );
    });
  });
}

// Navigation
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Initial render
renderCalendar();

const addBtn = document.getElementById("add-task");
const toDoList = document.querySelector(".todo-list");
const clearList = document.querySelector(".clear-list-btn");
const clearListCon = document.querySelector(".clear-list");

// make sure each heading input has a content before creating more
let editingHeader = false;

//creating and adding content function
function addTasks() {
  //make sure each task input has a content before creating more
  let taskBeingEdited = false;

  //content present create more else stop
  if (editingHeader) return;
  editingHeader = true;

  // div container for content creation
  const title = document.createElement("div");
  title.classList.add("title");
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("checkbox");

  // heading content creation
  const heading = document.createElement("h3");
  const headingInput = document.createElement("input");
  //remove title div
  const minusHeading = document.createElement("button");
  minusHeading.classList.add("minus", "remove");
  minusHeading.addEventListener("click", () => {
    title.remove();
  });
  // get heading text and control
  headingInput.addEventListener("change", () => {
    let value = headingInput.value;
    heading.textContent = `# ${value}`;
    headingInput.style.display = "none";
    headingBtn.textContent = "+";
    minusHeading.textContent = "-";
    title.appendChild(headingBtn);
  });
  // add them to their container
  title.append(headingInput, heading, minusHeading);

  //at click create sub task
  const headingBtn = document.createElement("button");
  headingBtn.addEventListener("click", () => {
    // if task input have content create more
    if (taskBeingEdited) return;
    taskBeingEdited = true;

    //task element creation
    const eachTask = document.createElement("div");
    eachTask.classList.add("each-task");
    const taskLabel = document.createElement("label");
    const checkedTask = document.createElement("input");
    checkedTask.setAttribute("type", "checkbox");
    const todoTask = document.createElement("input");

    //task text content creation
    todoTask.addEventListener("change", () => {
      let task = todoTask.value;
      taskLabel.textContent = task;
      todoTask.style.display = "none";
    });
    // removing task button and function
    const minusTask = document.createElement("button");
    minusTask.classList.add("minus");
    checkedTask.addEventListener("click", () => {
      minusTask.textContent = "-";
    });
    minusTask.addEventListener("click", () => {
      eachTask.remove();
    });

    //creating individual container for each task
    eachTask.append(checkedTask, taskLabel, todoTask, minusTask);
    // add to main container
    taskContainer.append(eachTask);
  });
  //add to major container
  toDoList.append(title, taskContainer);
}
//runs function at each click
addBtn.addEventListener("click", addTasks);
//clears function
clearList.addEventListener("click", () => {
  toDoList.innerHTML = "";
});
