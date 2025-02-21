let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("change");
  navbar.classList.toggle("active");
};



const courseData = {
  "FY": {
    "Sem 1": [],
    "Sem 2": []
  },
  "SY": {
    "Sem 3": [],
    "Sem 4": [
      { name: "Core Java", show: "./assets/QB/sem-4/core java/core java.html", download: "#" },
      { name: "Software Engineering ", show: "./assets/QB/sem-4/Software Engineer/Software Engineer.html", download: "./assets/QB/sem-4/Software Engineer/Software Engineer.docx" },
      { name: "Introduction to Embedded Systems", show: "./assets/QB/sem-4/Embedded System/Introduction to Embedded Systems.html", download: "#" },
      { name: "Computer graphics and animation", show: "./assets/QB/sem-4/computer animation/Computer Animation.html", download: "#" },
      { name: "Computer Oriented Statistical Techniques", show: "#", download: "#" },
    ]
  },
  "TY": {
    "Sem 5": [],
    "Sem 6": []
  }
};

const tabsContainer = document.getElementById("tabs");
const sectionsContainer = document.getElementById("sections");

Object.keys(courseData).forEach((year, index) => {
  tabsContainer.innerHTML += `<button class="tab ${index === 0 ? "active" : ""}" data-tab="${year}">${year}</button>`;
  let sectionContent = "";
  Object.keys(courseData[year]).forEach((sem) => {
    const subjects = courseData[year][sem];
    let subjectContent = subjects.length ? subjects.map(subject => `
      <div class="subject">
        <span>${subject.name}</span>
        <div class="buttons">
          <a class="btn show-btn" href="${subject.show}" target="_blank">Show</a>
          <a class="btn download-btn" href="${subject.download}" download>Download</a>
        </div>
      </div>`).join("") : '<p class="coming-soon">Coming Soon</p>';

    sectionContent += `
      <div class="accordion">
        <div class="accordion-header" onclick="toggleAccordion(this)">
          <span>${sem}</span>
          <span class="arrow">▶</span>
        </div>
        <div class="accordion-content">
          ${subjectContent}
        </div>
      </div>`;
  });
  sectionsContainer.innerHTML += `<div id="${year}" class="section ${index === 0 ? "active" : ""}">${sectionContent}</div>`;
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    document.querySelectorAll(".section").forEach((sec) => sec.classList.remove("active"));
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

function toggleAccordion(header) {
  const content = header.nextElementSibling;
  const arrow = header.querySelector(".arrow");
  if (content.classList.contains("open")) {
    content.classList.remove("open");
    arrow.style.transform = "rotate(0deg)";
  } else {
    header.closest(".section").querySelectorAll(".accordion-content").forEach((acc) => acc.classList.remove("open"));
    header.closest(".section").querySelectorAll(".arrow").forEach((arr) => arr.style.transform = "rotate(0deg)");
    content.classList.add("open");
    arrow.style.transform = "rotate(90deg)";
  }
}