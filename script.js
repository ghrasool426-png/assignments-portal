const list = document.getElementById("assignmentList");
const search = document.getElementById("search");
const sessionFilter = document.getElementById("sessionFilter");

function render(data) {
  list.innerHTML = "";
  data.forEach(item => {
    list.innerHTML += `
      <div class="card">
        <b>${item.programme}</b><br>
        Course: ${item.course} | Session: ${item.session}
        <a class="btn" href="${item.file}" download>Download</a>
      </div>
    `;
  });
}

render(assignments);

function filterData() {
  const text = search.value.toLowerCase();
  const session = sessionFilter.value;

  const filtered = assignments.filter(a =>
    a.course.toLowerCase().includes(text) &&
    (session === "all" || a.session === session)
  );

  render(filtered);
}

search.addEventListener("input", filterData);
sessionFilter.addEventListener("change", filterData);
