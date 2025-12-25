const list = document.getElementById("assignmentList");
const search = document.getElementById("search");
const sessionFilter = document.getElementById("sessionFilter");
const levelFilter = document.getElementById("levelFilter");
const subjectFilter = document.getElementById("subjectFilter");

// Initial render (nothing)
render([]);

// Populate subjects based on level
levelFilter.addEventListener("change", () => {
  const level = levelFilter.value;
  subjectFilter.innerHTML = `<option value="">Select Subject</option>`;
  subjectFilter.disabled = true;
  list.innerHTML = "";

  if (!level) return;

  const subjects = [
    ...new Set(assignments.filter(a => a.level === level).map(a => a.programme))
  ];

  subjects.forEach(sub => {
    subjectFilter.innerHTML += `<option value="${sub}">${sub}</option>`;
  });

  subjectFilter.disabled = false;
});

// Show assignments after subject select
subjectFilter.addEventListener("change", filterData);
search.addEventListener("input", filterData);
sessionFilter.addEventListener("change", filterData);

function filterData() {
  const level = levelFilter.value;
  const subject = subjectFilter.value;
  const text = search.value.toLowerCase();
  const session = sessionFilter.value;

  const filtered = assignments.filter(a =>
    (!level || a.level === level) &&
    (!subject || a.programme === subject) &&
    a.course.toLowerCase().includes(text) &&
    (session === "all" || a.session === session)
  );

  render(filtered);
}

function render(data) {
  list.innerHTML = "";
  if (data.length === 0) {
    list.innerHTML = `<p style="text-align:center;color:#777;">No assignments found</p>`;
    return;
  }

  data.forEach(item => {
    list.innerHTML += `
      <div class="card">
        <b>${item.level} – ${item.programme}</b><br>
        Course: ${item.course} | Session: ${item.session}
        <a class="btn" href="${item.file}" target="_blank">Download</a>
      </div>
    `;
  });
}
