import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate, dateTimerMs, timer;

const btn = document.querySelector("button[data-start]")
const timerRefs = {
    dayField: document.querySelector('span[data-days]'),
    hourField: document.querySelector('span[data-hours]'),
    minuteField: document.querySelector('span[data-minutes]'),
    secondField: document.querySelector('span[data-seconds]'),
}
btn.addEventListener("click", setTimer)

function setTimer() {
    updateTimer()
    timer = setInterval(updateTimer, 1000)
}
console.log('fsdfsd');
//функция обработки-обновления таймера
function updateTimer ()  {
        const currentTime = new Date().getTime()
        dateTimerMs = userSelectedDate - currentTime;

        const {days, hours, minutes, seconds} = convertMs(dateTimerMs)
        
        if (seconds === 0 && minutes === 0 && hours === 0 && days === 0) {
          clearInterval(timer)
      }

        timerRefs.dayField.innerHTML = addLeadingZero(days);
        timerRefs.hourField.innerHTML = addLeadingZero(hours);
        timerRefs.minuteField.innerHTML = addLeadingZero(minutes);
        timerRefs.secondField.innerHTML = addLeadingZero(seconds)   
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date().getTime(),// сегодня в мс
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0].getTime(); //выбранная
      
        if (options.defaultDate >= userSelectedDate) {
        btn.disabled = true
        iziToast.show({
        message: "Please choose a date in the future",
        position: 'topCenter',
        color: 'red'
       });
       }
       
        btn.disabled = false
    }
  };

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0')
  }

flatpickr('#datetime-picker', options)








  