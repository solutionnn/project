const facultySelect = document.getElementById('faculty-select');
const courseSelect = document.getElementById('course-select');
const groupSelect = document.getElementById('group-select');
const daySelect = document.getElementById('day-select');
const scheduleTable = document.getElementById('schedule');
const selectTitle = {
    course: 'Оберіть курс',
    group: 'Оберіть группу',
    day: 'Оберіть день тижня',
    default: 'Оберіть варіант'
}

loadSchedule();
if (!generalSchedule.length) {
    alert('Розклад не знайдено');
}

(function getFaculties() {
    const faculties = new Set(generalSchedule.map((item) => item.faculty));
    for (const value of faculties.values()) {
        const facultyOption = document.createElement('option');
        facultyOption.innerText = value;
        facultySelect.appendChild(facultyOption);
    }
})();

function addSelectOption(select, options, defTitle = selectTitle.default) {
    while(select.firstChild) {
        select.firstChild.remove();
    }
    const defOptionElement = document.createElement('option');
    defOptionElement.innerText = defTitle;
    defOptionElement.value = null;
    defOptionElement.disabled = true;
    defOptionElement.selected = true;
    select.appendChild(defOptionElement);
    for (const value of options) {
        const optionElement = document.createElement('option');
        optionElement.value = value;
        optionElement.innerText = value;
        select.appendChild(optionElement);
    }
}

facultySelect.addEventListener('change', function () {
    const faculty = facultySelect.value;
    if (faculty) {
        courseSelect.disabled = false;
        const courses = generalSchedule
            .filter((item) => item.faculty === faculty)
            .map((item) => item.course);
        addSelectOption(courseSelect, new Set(courses).values(), selectTitle.course);
        groupSelect.disabled = true;
        addSelectOption(groupSelect, [], selectTitle.group);
        daySelect.disabled = true;
        addSelectOption(daySelect, [], selectTitle.day);
        scheduleTable.classList.add('hidden');
    } else {
        courseSelect.disabled = true;
        addSelectOption(courseSelect, [], selectTitle.course);
        groupSelect.disabled = true;
        addSelectOption(groupSelect, [], selectTitle.group);
        daySelect.disabled = true;
        addSelectOption(daySelect, [], selectTitle.day);
        scheduleTable.classList.add('hidden');
    }
});

courseSelect.addEventListener('change', function () {
    const course = courseSelect.value;
    if (course) {
        groupSelect.disabled = false;
        const groups = generalSchedule
            .filter((item) => item.course === course && item.faculty === facultySelect.value)
            .map((item) => item.group);
        addSelectOption(groupSelect, new Set(groups).values(), selectTitle.group);
        daySelect.disabled = true;
        addSelectOption(daySelect, [], selectTitle.day);
        scheduleTable.classList.add('hidden');
    } else {
        groupSelect.disabled = true;
        addSelectOption(groupSelect, [], selectTitle.group);
        daySelect.disabled = true;
        addSelectOption(daySelect, [], selectTitle.day);
        scheduleTable.classList.add('hidden');
    }
});

groupSelect.addEventListener('change', function () {
    const group = groupSelect.value;
    if (group) {
        daySelect.disabled = false;
        const days = generalSchedule
            .filter((item) => item.faculty === facultySelect.value && item.course === courseSelect.value && item.group === group)
            .map((item) => item.day);
        addSelectOption(daySelect, new Set(days).values(), selectTitle.day);
        scheduleTable.classList.add('hidden');
    } else {
        daySelect.disabled = true;
        addSelectOption(daySelect, [], selectTitle.day);
        scheduleTable.classList.add('hidden');
    }
});

daySelect.addEventListener('change', function () {
    const day = daySelect.value;
    if (day) {
        const scheduleBody = scheduleTable.querySelector('tbody');
        while (scheduleBody.firstChild) {
            scheduleBody.firstChild.remove();
        }
        showSchedule(scheduleBody);
    } else {
        scheduleTable.classList.add('hidden');
    }
});

function showSchedule(tbody) {
    const scheduleList = generalSchedule.filter((item) =>
        item.faculty === facultySelect.value && item.course === courseSelect.value && item.group === groupSelect.value && item.day === daySelect.value
    );
    for (const item of scheduleList) {
        const tr = document.createElement('tr');
        const scheduleData = [item.time, item.subject, 'Сковорода Григорій Саввич', item.room];
        for (const prop of scheduleData) {
            const td = document.createElement('td');
            td.innerText = prop;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    scheduleTable.classList.remove('hidden');
}
