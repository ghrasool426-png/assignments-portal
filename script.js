alert("SCRIPT LOADED");

const list = document.getElementById("assignmentList");
const search = document.getElementById("search");
const sessionFilter = document.getElementById("sessionFilter");
const levelFilter = document.getElementById("levelFilter");
const subjectFilter = document.getElementById("subjectFilter");
// Force hide subject dropdown (cards only UI)
subjectFilter.style.display = "none";
const subjectSection = document.getElementById("subjectSection");
const subjectGrid = document.getElementById("subjectGrid");

/* =========================
   INITIAL STATE
========================= */
list.innerHTML = `<p style="text-align:center;color:#777;">
  Please select a programme
</p>`;

/* =========================
   PROGRAMME CARD CLICK
========================= */
function selectProgramme(level) {
  levelFilter.value = level;
  loadSubjects(level);
}

/* =========================
   LOAD SUBJECTS (CARDS + DROPDOWN)
========================= */
function loadSubjects(level) {
  subjectGrid.innerHTML = "";
  subjectSection.style.display = "none";
  subjectFilter.innerHTML = `<option value="">Select Subject</option>`;
  subjectFilter.disabled = true;

  if (!level) return;

  // 🔥 IMPORTANT: safe trim + unique subjects
  const subjects = [
    ...new Set(
      assignments
        .filter(item => item.level && item.level.trim() === level.trim())
        .map(item => item.programme && item.programme.trim())
    )
  ];

  if (subjects.length === 0) {
    list.innerHTML = `<p style="text-align:center;color:#777;">
      No subjects found
    </p>`;
    return;
  }

  subjects.forEach(sub => {
    if (!sub) return;

    // 👉 SUBJECT CARD
    const card = document.createElement("div");
    card.className = "subject-card";
    card.innerHTML = `<h3>${sub}</h3>`;
    card.onclick = () => {
      subjectFilter.value = sub;
      filterData();
    };
    subjectGrid.appendChild(card);

    // 👉 SUBJECT DROPDOWN (sync)
    subjectFilter.innerHTML += `<option value="${sub}">${sub}</option>`;
  });

  subjectFilter.disabled = false;
  subjectSection.style.display = "block";

  list.innerHTML = `<p style="text-align:center;color:#777;">
    Please select a subject
  </p>`;
}

/* =========================
   EVENTS
========================= */
levelFilter.addEventListener("change", () => {
  loadSubjects(levelFilter.value);
});

subjectFilter.addEventListener("change", filterData);
search.addEventListener("input", filterData);
sessionFilter.addEventListener("change", filterData);

/* =========================
   FILTER ASSIGNMENTS
========================= */
function filterData() {
  const level = levelFilter.value;
  const subject = subjectFilter.value;
  const text = search.value.toLowerCase();
  const session = sessionFilter.value;

  if (!level || !subject) {
    list.innerHTML = `<p style="text-align:center;color:#777;">
      Please select programme & subject
    </p>`;
    return;
  }

  const filtered = assignments.filter(item =>
    item.level.trim() === level.trim() &&
    item.programme.trim() === subject.trim() &&
    item.course.toLowerCase().includes(text) &&
    (session === "all" || item.session === session)
  );

  render(filtered);
}

/* =========================
   RENDER CARDS
========================= */
function render(data) {
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML = `<p style="text-align:center;color:#777;">
      No assignments found
    </p>`;
    return;
  }

  data.forEach(item => {
    list.innerHTML += `
      <div class="card">
        <b>${item.level} – ${item.programme}</b><br>
        Course: ${item.course} | Session: ${item.session}<br>
        <a class="btn" href="${item.file}" target="_blank">Download</a>
      </div>
    `;
  });
}

