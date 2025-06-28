const courseTitles = [
    'C Programming:', 'C++', 'Java Programming',
    'Data Structures and Algorithms (DSA)', 'Operating Systems', 'Database Management Systems (DBMS)',
    'Computer Networks', 'Compiler Design', 'Theory of Computation',
    '(OOPS) in C++/Java','Backend Development', 'frontend Development',
    'Python Programming','Cybersecurity','Machine Learning',
    'Artificial Intelligence','Data Science','Statistics and Probability',
    'DevOps', 'Git, GitHub & Version Control', 'Agile & Scrum Methodology',
    'mongoDB','Agile & Scrum Methodology', 'Mobile App Development',
    'Cloud Computing','Power BI','Network Security',
];

let selectedCourse = '';
let editRow = null;

document.addEventListener("DOMContentLoaded", () => {
  const courseSelect = document.getElementById("chooseCourse");
  if (courseSelect) {
    courseTitles.forEach(course => {
      const opt = document.createElement("option");
      opt.value = course;
      opt.textContent = course;
      courseSelect.appendChild(opt);
    });
  }

  const container = document.getElementById("coursesContainer");
  if (container) {
    courseTitles.forEach(course => {
      const card = document.createElement("div");
      card.className = "course-card";
      card.innerHTML = `
        <h3>${course}</h3>
        <button onclick="openModal('${course}')">View Details</button>
      `;
      container.appendChild(card);
    });
  }

  const selected = localStorage.getItem('selectedCourse');
  if (selected && courseSelect) {
    courseSelect.value = selected;
    courseSelect.disabled = true;
    selectedCourse = selected;
    localStorage.removeItem('selectedCourse');
  }

  const dashboardTable = document.getElementById("dashboardTable");
  if (dashboardTable) {
    const registrations = JSON.parse(localStorage.getItem("registrations") || "[]");
    registrations.forEach(data => {
      const row = dashboardTable.insertRow();
      row.insertCell(0).innerText = data.name;
      row.insertCell(1).innerText = data.dob;
      row.insertCell(2).innerText = data.email;
      row.insertCell(3).innerText = data.phone;
      row.insertCell(4).innerText = data.course;
      row.insertCell(5).innerText = data.duration;
      row.insertCell(6).innerHTML = `<button onclick="openModal('${data.course}')">View Learning Path</button>`;
      row.insertCell(7).innerHTML = `<button class='edit-btn' onclick='editEntry(this)'>Edit</button> <button class='delete-btn' onclick='deleteEntry(this)'>Delete</button>`;
    });
  }
});

function openModal(courseName) {
  selectedCourse = courseName;
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modal-text");
  if (modal && modalText) {
    modalText.innerHTML = `<h3>${courseName}</h3><p>${courseName} - Learn more about this subject.</p>`;
    modal.style.display = "flex";
  }
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "none";
}

function openRegisterForm(showCourseSelect = false) {
  closeModal();
  if (selectedCourse) {
    localStorage.setItem('selectedCourse', selectedCourse);
  }
  window.location.href = 'enroll.html';
}

function closeRegisterForm() {
  const modal = document.getElementById("registerModal");
  if (modal) modal.style.display = "none";
  editRow = null;
}

function registerCourse(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const dob = document.getElementById('dob').value;
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const duration = document.getElementById('duration').value;
  const courseSelect = document.getElementById('chooseCourse');
  const course = selectedCourse || (courseSelect ? courseSelect.value : '');

  const errorBox = document.getElementById("formError");
  if (errorBox) errorBox.innerText = "";

  if (!/^[0-9]{10}$/.test(phone)) {
    errorBox.innerText = "Phone number must be exactly 10 digits.";
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    errorBox.innerText = "Enter a valid email address.";
    return;
  }

  if (!duration) {
    errorBox.innerText = "Please select a course duration.";
    return;
  }

  if (!course) {
    errorBox.innerText = "Please select a course.";
    return;
  }

  const newEntry = { name, dob, email, phone, course, duration };
  let registrations = JSON.parse(localStorage.getItem("registrations") || "[]");

  if (editRow) {
    editRow.cells[0].innerText = name;
    editRow.cells[1].innerText = dob;
    editRow.cells[2].innerText = email;
    editRow.cells[3].innerText = phone;
    editRow.cells[4].innerText = course;
    editRow.cells[5].innerText = duration;
	
    const index = Array.from(editRow.parentElement.rows).indexOf(editRow) - 1; // subtract header
    registrations[index] = newEntry;
    localStorage.setItem("registrations", JSON.stringify(registrations));
    editRow = null;
  } else {
    const isDuplicate = registrations.some(r => r.name === name && r.course === course);
    if (isDuplicate) {
      errorBox.innerText = "Already registered for this course.";
      return;
    }
	
    const table = document.getElementById("dashboardTable");
    if (table) {
      const row = table.insertRow();
      row.insertCell(0).innerText = name;
      row.insertCell(1).innerText = dob;
      row.insertCell(2).innerText = email;
      row.insertCell(3).innerText = phone;
      row.insertCell(4).innerText = course;
      row.insertCell(5).innerText = duration;
      row.insertCell(6).innerHTML = `<button onclick="openModal('${course}')">View Learning Path</button>`;
      row.insertCell(7).innerHTML = `<button class='edit-btn' onclick='editEntry(this)'>Edit</button> <button class='delete-btn' onclick='deleteEntry(this)'>Delete</button>`;
    }

    registrations.push(newEntry);
    localStorage.setItem("registrations", JSON.stringify(registrations));
  }

  closeRegisterForm();
  
  if (window.location.pathname.includes('enroll.html')) {
    window.location.href = 'dashboard.html';
  }
}

function editEntry(btn) {
  editRow = btn.parentElement.parentElement;
  document.getElementById('name').value = editRow.cells[0].innerText;
  document.getElementById('dob').value = editRow.cells[1].innerText;
  document.getElementById('email').value = editRow.cells[2].innerText;
  document.getElementById('phone').value = editRow.cells[3].innerText;
  selectedCourse = editRow.cells[4].innerText;
  document.getElementById('duration').value = editRow.cells[5].innerText;

  const courseSelect = document.getElementById('chooseCourse');
  if (courseSelect) {
    courseSelect.value = selectedCourse;
    courseSelect.disabled = true;
  }

  const modal = document.getElementById("registerModal");
  if (modal) modal.style.display = "flex";
}

function deleteEntry(btn) {
  const row = btn.parentElement.parentElement;
  const name = row.cells[0].innerText;
  const course = row.cells[4].innerText;

  row.remove();

  let registrations = JSON.parse(localStorage.getItem("registrations") || "[]");
  registrations = registrations.filter(entry => !(entry.name === name && entry.course === course));
  localStorage.setItem("registrations", JSON.stringify(registrations));
}
