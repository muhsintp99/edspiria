document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("campusCardContainer");
  const searchInput = document.getElementById("searchInput");
  const filterProgram = document.getElementById("filterProgram");
  const filterCountry = document.getElementById("filterCountry");
  const filterCourse = document.getElementById("filterCourse");

  let colleges = [];

  // Fetch data
  fetch("./json/college.json")
    .then(res => res.json())
    .then(data => {
      colleges = data.filter(item => item.main_category === "International");
      populateFilters(colleges);
      renderCards(colleges);
    });

  // Render cards
  function renderCards(data) {
    cardContainer.innerHTML = "";

    if (data.length === 0) {
      cardContainer.innerHTML = "<p>No matches found.</p>";
      return;
    }

    data.forEach(college => {
      const card = document.createElement("div");
      card.className = "col-md-6 col-lg-4";

      card.innerHTML = `
        <div class="faculty-card">
          <div class="faculty-image">
            <img src="${college.image}" class="img-fluid" alt="${college.title}">
          </div>
          <div class="faculty-info">
            <h4>${college.title}</h4>
            <p class="faculty-title">${college.contents}</p>
            <div class="faculty-specialties">
              <span>${college.course_or_program}</span>
              <span>${college.country}</span>
            </div>
            <div class="faculty-contact">
              <a href="${college.link}" target="_blank" class="profile-link"><i class="bi bi-globe"></i> Website</a>
            </div>
          </div>
        </div>
      `;
      cardContainer.appendChild(card);
    });
  }

  // Populate Filters
  function populateFilters(data) {
    const programs = new Set();
    const countries = new Set();
    const courses = new Set();

    data.forEach(item => {
      programs.add(item.category);
      countries.add(item.country);
      item.course_or_program.split(",").forEach(c => courses.add(c.trim()));
    });

    createFilterList(filterProgram, programs, "program");
    createFilterList(filterCountry, countries, "country");
    createFilterList(filterCourse, courses, "course");
  }

  // Create Filter List Items
  function createFilterList(container, items, type) {
    container.innerHTML = "";
    [...items].forEach(val => {
      const li = document.createElement("li");
      li.className = "nav-item";
      const btn = document.createElement("button");
      btn.className = "nav-link";
      btn.innerText = val;
      btn.addEventListener("click", () => {
        const filtered = colleges.filter(item => {
          if (type === "program") return item.category === val;
          if (type === "country") return item.country === val;
          if (type === "course") return item.course_or_program.includes(val);
        });
        renderCards(filtered);
      });
      li.appendChild(btn);
      container.appendChild(li);
    });
  }

  // Search
  document.getElementById("searchBtn").addEventListener("click", () => {
    const keyword = searchInput.value.toLowerCase();
    const result = colleges.filter(item =>
      item.title.toLowerCase().includes(keyword) ||
      item.country.toLowerCase().includes(keyword) ||
      item.course_or_program.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword)
    );
    renderCards(result);
  });
});