let editGeneralScheduleIndex;
const day = document.getElementById('dayInput');
const time = document.getElementById('timeInput');
const subject = document.getElementById('subjectInput');
const group = document.getElementById('groupInput');
const course = document.getElementById('courseInput');
const faculty = document.getElementById('facultyInput');
const room = document.getElementById('roomInput');

loadSchedule();

document.getElementById('scheduleForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const schedule = {
        day: day.value,
        time: time.value,
        subject: subject.value,
        group: group.value,
        course: course.value,
        faculty: faculty.value,
        room: room.value
    };
    if (typeof editGeneralScheduleIndex === 'number') {
        generalSchedule.splice(editGeneralScheduleIndex, 1, schedule);
    } else {
        generalSchedule.push(schedule);
    }
    saveToStorage(STORAGE_KEYS.scheduleKey, generalSchedule);
    alert('Розклад збережено');
    location.reload();
});

(function drawScheduleTable() {
    const scheduleContainer = document.querySelector('#scheduleTableContainer');
    for (let i = 0; i < generalSchedule.length; i++) {
        // create table
        const table = document.createElement('table');
        table.id = `schedule_${i + 1}`;
        // create table header
        const thead = document.createElement('thead');
        const theadRow = document.createElement('tr');
        const tableTitle = ['Час', 'Факультет', 'День тижня', 'Аудиторія', 'Курс', 'Група', 'Предмет'];
        for (const title of tableTitle) {
            const th = document.createElement('th');
            th.innerText = title;
            theadRow.appendChild(th);
        }
        thead.appendChild(theadRow);
        // create table body
        const tbody = document.createElement('tbody');
        const tbodyRow = document.createElement('tr');
        const tableValue = [
            generalSchedule[i].time,
            generalSchedule[i].faculty,
            generalSchedule[i].day,
            generalSchedule[i].room,
            generalSchedule[i].course,
            generalSchedule[i].group,
            generalSchedule[i].subject
        ];
        for (const value of tableValue) {
            const td = document.createElement('td');
            td.innerText = value;
            tbodyRow.appendChild(td);
        }
        tbody.appendChild(tbodyRow);
        // add title and value to table
        table.appendChild(thead);
        table.appendChild(tbody);
        // add edit and delete schedule buttons
        const editBtn = document.createElement('button');
        editBtn.innerText = 'Редагувати розклад';
        editBtn.style.backgroundColor = '#55788d';
        editBtn.style.color = "white";
        editBtn.onclick = function() {
            day.value = generalSchedule[i].day;
            time.value = generalSchedule[i].time;
            subject.value = generalSchedule[i].subject;
            group.value = generalSchedule[i].group;
            course.value = generalSchedule[i].course;
            faculty.value = generalSchedule[i].faculty;
            room.value = generalSchedule[i].room;
            editGeneralScheduleIndex = i;
        };
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Видалити розклад';
        deleteBtn.style.backgroundColor = '#55788d';
        deleteBtn.style.color = "white";
        deleteBtn.onclick = function() {
            const scheduleTable = document.getElementById(`schedule_${i + 1}`);
            scheduleTable.parentNode.removeChild(scheduleTable);
            generalSchedule.splice(i, 1);
            saveToStorage(STORAGE_KEYS.scheduleKey, generalSchedule);
            // remove edit and delete buttons
            editBtn.remove();
            deleteBtn.remove();
        };
        // add all data to table container
        scheduleContainer.appendChild(table);
        scheduleContainer.appendChild(editBtn);
        scheduleContainer.appendChild(deleteBtn);
    }
})();
