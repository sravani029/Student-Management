const API_BASE_URL = 'http://localhost:8080/sms/api/students';
let currentPage = 0;
const pageSize = 10;
let totalPages = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    getAllStudents();
});

// Tab switching
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab and mark button as active
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');

    // Reset form when switching to add tab
    if (tabName === 'add') {
        resetForm();
    }
}

// Get all students with pagination
async function getAllStudents(page = 0) {
    try {
        const response = await fetch(`${API_BASE_URL}?page=${page}&size=${pageSize}`);
        const data = await response.json();

        if (response.ok) {
            displayStudents(data.students);
            currentPage = data.currentPage;
            totalPages = data.totalPages;
            updatePagination(data);
        } else {
            showAlert('Error', data.error || 'Failed to fetch students');
        }
    } catch (error) {
        showAlert('Error', 'Failed to connect to server. Please ensure the backend is running.');
        console.error('Error:', error);
    }
}

// Display students in table
function displayStudents(students) {
    const tableBody = document.getElementById('tableBody');
    
    if (students.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="9" class="text-center">No students found</td></tr>';
        return;
    }

    tableBody.innerHTML = students.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.course}</td>
            <td>${student.gpa}</td>
            <td>${student.address}</td>
            <td>
                <div class="action-buttons">
                    <button onclick="editStudent(${student.id})" class="btn btn-edit">Edit</button>
                    <button onclick="deleteStudent(${student.id})" class="btn btn-delete">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Update pagination buttons
function updatePagination(data) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Previous';
    prevBtn.className = 'page-btn';
    prevBtn.disabled = !data.hasPrevious;
    prevBtn.onclick = () => getAllStudents(currentPage - 1);
    pagination.appendChild(prevBtn);

    // Page numbers
    for (let i = 0; i < data.totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i + 1;
        btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
        btn.onclick = () => getAllStudents(i);
        pagination.appendChild(btn);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.className = 'page-btn';
    nextBtn.disabled = !data.hasNext;
    nextBtn.onclick = () => getAllStudents(currentPage + 1);
    pagination.appendChild(nextBtn);
}

// Search students
async function searchStudents() {
    const query = document.getElementById('searchInput').value.trim();
    
    if (!query) {
        showAlert('Error', 'Please enter a search term');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}&page=0&size=${pageSize}`);
        const data = await response.json();

        if (response.ok) {
            displayStudents(data.students);
            currentPage = data.currentPage;
            totalPages = data.totalPages;
            updatePagination(data);
        } else {
            showAlert('Error', data.error || 'Search failed');
        }
    } catch (error) {
        showAlert('Error', 'Failed to search students');
        console.error('Error:', error);
    }
}

// Submit add student form
async function submitForm(event) {
    event.preventDefault();

    const student = {
        name: document.getElementById('name').value,
        studentId: document.getElementById('studentIdInput').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        course: document.getElementById('course').value,
        gpa: parseFloat(document.getElementById('gpa').value),
        address: document.getElementById('address').value
    };

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });

        const data = await response.json();

        if (response.ok) {
            showAlert('Success', 'Student added successfully!');
            resetForm();
            getAllStudents(0);
            document.querySelector('[onclick="showTab(\'view\')"]').click();
        } else {
            showAlert('Error', data.error || 'Failed to add student');
        }
    } catch (error) {
        showAlert('Error', 'Failed to add student');
        console.error('Error:', error);
    }
}

// Reset form
function resetForm() {
    document.getElementById('studentForm').reset();
    document.getElementById('studentId').value = '';
    document.getElementById('formTitle').textContent = 'Add New Student';
}

// Get student for editing
async function editStudent(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        const student = await response.json();

        if (response.ok) {
            document.getElementById('editStudentId').value = student.id;
            document.getElementById('editName').value = student.name;
            document.getElementById('editStudentIdInput').value = student.studentId;
            document.getElementById('editEmail').value = student.email;
            document.getElementById('editPhone').value = student.phone;
            document.getElementById('editCourse').value = student.course;
            document.getElementById('editGpa').value = student.gpa;
            document.getElementById('editAddress').value = student.address;

            document.getElementById('editModal').classList.add('show');
        } else {
            showAlert('Error', 'Failed to fetch student details');
        }
    } catch (error) {
        showAlert('Error', 'Failed to fetch student details');
        console.error('Error:', error);
    }
}

// Submit edit form
async function submitEditForm(event) {
    event.preventDefault();

    const id = document.getElementById('editStudentId').value;
    const student = {
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        course: document.getElementById('editCourse').value,
        gpa: parseFloat(document.getElementById('editGpa').value),
        address: document.getElementById('editAddress').value
    };

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });

        const data = await response.json();

        if (response.ok) {
            showAlert('Success', 'Student updated successfully!');
            closeModal();
            getAllStudents(currentPage);
        } else {
            showAlert('Error', data.error || 'Failed to update student');
        }
    } catch (error) {
        showAlert('Error', 'Failed to update student');
        console.error('Error:', error);
    }
}

// Delete student
async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (response.ok) {
            showAlert('Success', 'Student deleted successfully!');
            getAllStudents(currentPage);
        } else {
            showAlert('Error', data.error || 'Failed to delete student');
        }
    } catch (error) {
        showAlert('Error', 'Failed to delete student');
        console.error('Error:', error);
    }
}

// Close edit modal
function closeModal() {
    document.getElementById('editModal').classList.remove('show');
}

// Show alert
function showAlert(title, message) {
    document.getElementById('alertTitle').textContent = title;
    document.getElementById('alertMessage').textContent = message;
    document.getElementById('alertModal').classList.add('show');
}

// Close alert
function closeAlert() {
    document.getElementById('alertModal').classList.remove('show');
}

// Close modals when clicking outside
window.onclick = function(event) {
    const editModal = document.getElementById('editModal');
    const alertModal = document.getElementById('alertModal');
    
    if (event.target === editModal) {
        editModal.classList.remove('show');
    }
    if (event.target === alertModal) {
        alertModal.classList.remove('show');
    }
}
