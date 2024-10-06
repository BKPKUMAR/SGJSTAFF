document.addEventListener('DOMContentLoaded', function() {
    let staffList = ['John Doe', 'Jane Smith', 'David Johnson'];  // Initial staff list
    const staffListElement = document.getElementById('staff-list');
    const circularListElement = document.getElementById('circular-list');
    const adminPanel = document.getElementById('admin-panel');
    const loginSection = document.getElementById('admin-login-section');
    const alarmSound = document.getElementById('alarm-sound');

    const adminCredentials = {
        id: 'admin123',
        password: 'adminpass'
    };

    // Admin login logic
    document.getElementById('login-btn').addEventListener('click', function() {
        const adminId = document.getElementById('admin-id').value;
        const adminPassword = document.getElementById('admin-password').value;

        if (adminId === adminCredentials.id && adminPassword === adminCredentials.password) {
            loginSection.style.display = 'none';
            adminPanel.style.display = 'block';
        } else {
            document.getElementById('login-error').textContent = 'Invalid Admin ID or Password.';
        }
    });

    // Render staff list
    function renderStaffList() {
        staffListElement.innerHTML = '';  // Clear the list
        staffList.forEach((staff, index) => {
            const li = document.createElement('li');
            li.textContent = staff;

            // Add delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                staffList.splice(index, 1);  // Remove staff from array
                renderStaffList();  // Re-render the staff list
            });

            li.appendChild(deleteBtn);
            staffListElement.appendChild(li);
        });
    }

    renderStaffList();  // Initial render

    // Add new staff
    document.getElementById('add-staff-btn').addEventListener('click', function() {
        const newStaffName = document.getElementById('new-staff-name').value;
        if (newStaffName) {
            staffList.push(newStaffName);
            renderStaffList();
            document.getElementById('new-staff-name').value = '';  // Clear input
        }
    });

    // Post circular
    document.getElementById('post-circular-btn').addEventListener('click', function() {
        const adminName = document.getElementById('admin-name').value;
        const fileInput = document.getElementById('circular-upload');
        const file = fileInput.files[0];

        if (adminName && file) {
            // Play alarm sound
            alarmSound.play();

            // Create list item for the circular
            const li = document.createElement('li');
            li.textContent = `${adminName} posted a circular: ${file.name}`;

            // Add a "Read" checkbox for each staff member
            staffList.forEach(staff => {
                const checkboxLabel = document.createElement('label');
                checkboxLabel.textContent = staff;

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.classList.add('checkbox');
                checkboxLabel.appendChild(checkbox);

                li.appendChild(checkboxLabel);
            });

            circularListElement.appendChild(li);  // Append to circular list
        } else {
            alert('Please provide admin name and upload a file.');
        }
    });
});

