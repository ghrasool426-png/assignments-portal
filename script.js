const list = document.getElementById("assignmentList");
const search = document.getElementById("search");
const sessionFilter = document.getElementById("sessionFilter");
const levelFilter = document.getElementById("levelFilter");
const subjectFilter = document.getElementById("subjectFilter");

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
   LOAD SUBJECTS (MAIN FIX)
========================= */
function loadSubjects(level) {
  subjectFilter.innerHTML = `<option value="">Select Subject</option>`;
  subjectFilter.disabled = true;

  if (!level) return;

  const subjects = [
    ...new Set(
      assignments
        .filter(item => item.level === level)
        .map(item => item.programme)
    )
  ];

  if (subjects.length === 0) {
    list.innerHTML = `<p style="text-align:center;color:#777;">
      No subjects available
    </p>`;
    return;
  }

  subjects.forEach(sub => {
    subjectFilter.innerHTML += `<option value="${sub}">${sub}</option>`;
  });

  subjectFilter.disabled = false;

  list.innerHTML = `<p style="text-align:center;color:#777;">
    Please select a subject
  </p>`;
}

/* =========================
   DROPDOWN CHANGE EVENTS
========================= */
levelFilter.addEventListener("change", () => {
  loadSubjects(levelFilter.value);
});

subjectFilter.addEventListener("change", filterData);
search.addEventListener("input", filterData);
sessionFilter.addEventListener("change", filterData);

/* =========================
   FILTER & RENDER
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
    item.level === level &&
    item.programme === subject &&
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
        Course: ${item.course} | Session: ${item.session}
        <br>
        <a class="btn" href="${item.file}" target="_blank">Download</a>
      </div>
    `;
  });
}
