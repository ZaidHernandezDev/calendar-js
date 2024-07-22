"use strict";

let calendarBody = document.getElementById("calendar-body");
let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");
let headerMonthYear = document.getElementById("monthAndYear");

//función para obtener el nombre del mes (Pasar a un archivo aparte)
function getMonthName(monthNumber) {
    const monthNames = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    return monthNames[monthNumber];
}

//función para obtener el nombre del día (Pasar a un archivo aparte)
function getDayName(dayNumber) {
    const dayNames = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
    ];

    return dayNames[dayNumber];
}

//función para obtener la fecha en que inicia el mes (Pasar a un archivo aparte)
function getStartMonthDate(year, month) {
    return new Date(year, month, 1);
}

//función para obtener los días en un mes (Pasar a un archivo aparte)
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

//función para ir al mes pasado
function prevMonth(printedMonth, printedYear) {
    let newPrintedYear = printedMonth === 0 ? printedYear - 1 : printedYear;
    let newPrintedMonth = printedMonth === 0 ? 11 : printedMonth - 1;
    return [newPrintedYear, newPrintedMonth];
}

//función para ir al mes siguiente
function nextMonth(printedMonth, printedYear) {
    let newPrintedYear = printedMonth === 11 ? printedYear + 1 : printedYear;
    let newPrintedMonth = printedMonth === 11 ? 0 : printedMonth + 1;
    return [newPrintedYear, newPrintedMonth];
}

//función para ir a la semana siguiente
function nextWeek(printedYear, printedMonth, printedWeek) {
    let newPrintedWeek = printedWeek === 5 ? 0 : printedWeek + 1;
    let newPrintedMonth = printedWeek === 5 ? printedMonth + 1 : printedMonth;
    let newPrintedYear = printedWeek === 5 ? printedYear : printedYear;
    return [newPrintedYear, newPrintedMonth, newPrintedWeek];
}

//función para ir a la fecha actual
function currentMonth() {
    let currentDate = new Date();
    return [
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
    ];
}

prevButton.addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    startMonth = new Date(currentYear, currentMonth, 1);
    startMonth = startMonth.getDay();
    calendarBody.innerHTML = "";
    createCalendar();
    monthYear.innerHTML = `${getMonthName(currentMonth)} ${currentMonth + 1
        } / ${currentYear}`;
});

nextButton.addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    startMonth = new Date(currentYear, currentMonth, 1);
    startMonth = startMonth.getDay();
    calendarBody.innerHTML = "";
    createCalendar();
    monthYear.innerHTML = `${getMonthName(currentMonth)} ${currentMonth + 1
        } / ${currentYear}`;
});

function createCalendar() {
    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        // Crea 6 filas para los días de la semana

        for (let j = 0; j < 7; j++) {
            // Crea 7 columnas para los días

            if (i === 0 && j < startMonth) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
                // crea celdas vacías
            } else if (date > daysInMonth(currentMonth, currentYear)) {
                break;
            } else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === currentDay) {
                    cell.classList.add("today");
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        calendarBody.appendChild(row);
        console.log("calendarBody", calendarBody);
    }
}

//Evento para cargar el calendario al cargar la página
// document.addEventListener("DOMContentLoaded", function () {
//   createCalendar();
//   monthYear.innerHTML = `${getMonthName(currentMonth)} ${
//     currentMonth + 1
//   } / ${currentYear}`;
// });

function getCurrentWeek(today) {
    const today = new Date();

    // Obtener el día de la semana (0 es domingo, 1 es lunes, etc.)
    const dayOfWeek = today.getDay(); // día de la semana (0-6)

    // Calcular el primer día de la semana (domingo)
    const firstDayOfWeek = new Date(today);
    const diff = dayOfWeek;
    firstDayOfWeek.setDate(today.getDate() - diff);

    // Calcular el último día de la semana (sábado)
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    return {
        firstDay: firstDayOfWeek,
        lastDay: lastDayOfWeek,
    };
}

const week = getCurrentWeek();
console.log(
    `Semana actual: Desde ${week.firstDay} hasta ${week.lastDay}`
);
