document.addEventListener('DOMContentLoaded', function() {
    const courses = document.querySelectorAll('.course-selection input[type="checkbox"]');
    const timetable = document.getElementById('timetable').getElementsByTagName('tbody')[0];

    // Initialize the timetable with timeslots
    const timeslots = [
        '08:00-10:00',
        '10:00-12:00',
        '12:00-14:00',
        '14:00-16:00',
        '16:00-18:00',
        '18:00-20:00'
    ];

    // Create timetable rows
    timeslots.forEach(slot => {
        const row = timetable.insertRow();
        const timeCell = row.insertCell();
        timeCell.innerText = slot;
        for (let i = 0; i < 6; i++) {
            row.insertCell();
        }
    });

    // Add event listeners to course checkboxes
    courses.forEach(course => {
        course.addEventListener('change', function() {
            updateTimetable();
        });
    });

    // Function to update timetable based on selected courses
    function updateTimetable() {
        // Clear previous timetable entries
        for (let row of timetable.rows) {
            for (let cell of row.cells) {
                if (cell !== row.cells[0]) {
                    cell.innerText = '';
                    cell.classList.remove('course', 'conflict');
                }
            }
        }

        // Update timetable with selected courses
        courses.forEach(course => {
            if (course.checked) {
                const courseName = course.dataset.course;
                const days = course.dataset.days.split(',');
                const time = course.dataset.time;
                const color = course.dataset.color;

                for (let row of timetable.rows) {
                    if (row.cells[0].innerText === time) {
                        days.forEach(day => {
                            let cellIndex;
                            switch(day) {
                                case 'Mon': cellIndex = 1; break;
                                case 'Tue': cellIndex = 2; break;
                                case 'Wed': cellIndex = 3; break;
                                case 'Thu': cellIndex = 4; break;
                                case 'Fri': cellIndex = 5; break;
                                case 'Sat': cellIndex = 6; break;
                            }
                            const cell = row.cells[cellIndex];
                            if (cell.innerText !== '') {
                                // Conflict handling: mark conflicting courses with *
                                cell.innerText += ' *';
                                cell.classList.add('conflict');
                            } else {
                                cell.innerText = courseName;
                                cell.classList.add('course');
                            }
                            cell.style.backgroundColor = color; // Set course color
                        });
                    }
                }
            }
        });
    }
});
