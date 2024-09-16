import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerInterval = null;

const options = {
enableTime: true,
time_24hr: true,
defaultDate: new Date(),
minuteIncrement: 1,
onClose(selectedDates) {
const selectedDate = selectedDates[0];

        if (selectedDate <= new Date()) {
            iziToast.error({
                position: 'topRight',
                iconColor: '#fff',
                titleColor: '#fff',
                messageColor: '#fff',
                backgroundColor: '#ef4040',
                title: 'Error',
                message: 'Please choose a date in the future',
            });
            startButton.disabled = true;
        } else {
            userSelectedDate = selectedDate;
            startButton.disabled = false;
        }
    },
};

flatpickr(datetimePicker, options);

startButton.addEventListener('click', () => {
    if (userSelectedDate) {
        startCountdown();
        startButton.disabled = true;
        datetimePicker.disabled = true;
    }
});

function startCountdown() {
    timerInterval = setInterval(() => {
        const currentTime = new Date();
        const timeDifference = userSelectedDate - currentTime;

        if (timeDifference <= 0) {
            clearInterval(timerInterval);
            updateTimerDisplay(0, 0, 0, 0);
            iziToast.success({
                position: 'topRight',
                iconColor: '#fff',
                titleColor: '#fff',
                messageColor: '#fff',
                backgroundColor: '#59a10d',
                title: 'Completed',
                message: 'Countdown finished!',
            });
            datetimePicker.disabled = false;
            startButton.disabled = true;
        } else {
            const { days, hours, minutes, seconds } = convertMs(timeDifference);
            updateTimerDisplay(days, hours, minutes, seconds);
        }
    }, 1000);
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function updateTimerDisplay(days, hours, minutes, seconds) {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
return String(value).padStart(2, '0');
}
