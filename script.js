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
      alert(`You clicked ${day} ${currentDate.toLocaleString("default", { month: "long" })} ${year}`);
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

