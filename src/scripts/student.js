const facultySelect = document.getElementById('faculty-select');
const courseSelect = document.getElementById('course-select');
const groupSelect = document.getElementById('group-select');
const scheduleTable = document.getElementById('schedule');
const scheduleBody = scheduleTable.querySelector('tbody');

facultySelect.addEventListener('change', function () {
    const faculty = facultySelect.value;
    if (faculty) {
        courseSelect.disabled = false;
        populateCourses(faculty);
    } else {
        courseSelect.disabled = true;
        groupSelect.disabled = true;
        scheduleTable.classList.add('hidden');
    }
});

courseSelect.addEventListener('change', function () {
    const course = courseSelect.value;
    if (course) {
        groupSelect.disabled = false;
        populateGroups(course);
    } else {
        groupSelect.disabled = true;
        scheduleTable.classList.add('hidden');
    }
});

groupSelect.addEventListener('change', function () {
    const group = groupSelect.value;
    if (group) {
        showSchedule(group);
    } else {
        scheduleTable.classList.add('hidden');
    }
});

function populateCourses(faculty) {
    const courses = {
        'Факультет 1': ['1 курс', '2 курс'],
        'Факультет 2': ['1 курс', '2 курс']
    };
    populateSelect(courses[faculty], courseSelect);
}

function populateGroups(course) {
    const groups = {
        '1 курс': ['1 группа', '2 группа'],
        '2 курс': ['1 группа', '2 группа']
    };
    populateSelect(groups[course], groupSelect);
}

function populateSelect(options, select) {
    select.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Выберите ' + select.id;
    select.add(defaultOption);
    options.forEach(function (option) {
        const newOption = document.createElement('option');
        newOption.value = option;
        newOption.text = option;
        select.add(newOption);
    });
}

const schedule = {
    '1 группа': [
        {time: '8:00-10:00', subject: 'Вища математика', teacher: 'Іванов Іван Іванович', room: '101'},
        {time: '12:15-13:15', subject: 'Фізика', teacher: 'Петров Петро Петрович', room: '103'}
    ],
    '2 группа': [
        {time: '8:30-10:50', subject: 'Істория', teacher: 'Сідоров Сідор Сідорович', room: '104'},
        {time: '10:15-12:15', subject: 'Філософія', teacher: 'Козлов Кізьма Козьміч', room: '105'}
    ]
};

function showSchedule(group) {
    scheduleBody.innerHTML = '';
    schedule[group].forEach(function (lecture) {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        timeCell.textContent = lecture.time;
        row.appendChild(timeCell);
        const subjectCell = document.createElement('td');
        subjectCell.textContent = lecture.subject;
        row.appendChild(subjectCell);
        const teacherCell = document.createElement('td');
        teacherCell.textContent = lecture.teacher;
        row.appendChild(teacherCell);
        const roomCell = document.createElement('td');
        roomCell.textContent = lecture.room;
        row.appendChild(roomCell);
        scheduleBody.appendChild(row);
    });
    scheduleTable.classList.remove('hidden');
}
