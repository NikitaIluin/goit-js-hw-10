import flatpickr from "flatpickr";
import iziToast from "izitoast";
import close from "../img/bi_x-octagon.svg";
const dataInput = document.querySelector("#datetime-picker");
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0].getTime() >= Date.now()){
        activeButton()
      } else {
        iziToast.show({
            class: 'messageError',
            iconColor: 'white',
            iconUrl: close,
            message: 'Please choose a date in the future',
            messageColor: 'white',
            close: false,
            backgroundColor: 'red',
            position: 'topRight',
            
        });
      }
    },
  };
const fp = flatpickr(dataInput,options); 
const startButton = document.querySelector(".button-start")
const day = document.querySelector("[data-days]")
const hrs = document.querySelector("[data-hours]")
const mins = document.querySelector("[data-minutes]")
const secs = document.querySelector("[data-seconds]")
const input = document.querySelector("#datetime-picker");
const inputFlatpickr = document.querySelector(".flatpickr-input");

dataInput.addEventListener("input", fp, disabledButton());
function disabledButton() {
    startButton.setAttribute("disabled", "disabled")
    }
function disabledInputFlatpickr (){
    inputFlatpickr.setAttribute("disabled", "disabled")
    input.setAttribute("disabled", "disabled")
}
function activeButton(){
    startButton.removeAttribute("disabled")
}

class Timer {
    constructor (timerNumber){
        this.startId = null;
        this.timerNumber = timerNumber;
        
    }
    start (){
        const dateMemoryPressStart = new Date(dataInput.value).getTime();
        this.startId = setInterval((()=>{
            const dateMemoryInterval= dateMemoryPressStart-Date.now();
            const dateToSec = this.mSToTime(dateMemoryInterval)
            this.timerNumber(dateToSec);
            console.log(dateToSec.secs)
            if(dateToSec.secs === 0 && dateToSec.mins === 0 && dateToSec.hrs === 0 && dateToSec.day === 0){
                this.stop()
            }
        }), 1000)
        disabledButton();
        disabledInputFlatpickr();
    }
    stop (){
       clearInterval(this.startId);
       
    }
    mSToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        s = (s - mins) / 60;
        var hrs = s % 24;
        var day = (s - hrs) / 24;
        return { day, hrs, mins, secs };
        }
}
function timerChangeNumber(dateToSec) {
    const string = convertTime(dateToSec);
    day.textContent = string.day
    hrs.textContent = string.hrs
    mins.textContent = string.mins
    secs.textContent = string.secs
}
function convertTime ({day, hrs, mins, secs}){
day = day.toString().padStart(2, '0');    
hrs = hrs.toString().padStart(2, '0');
mins = mins.toString().padStart(2, '0');
secs = secs.toString().padStart(2, '0');
return {day, hrs, mins, secs}
}
const timerSite = new Timer(timerChangeNumber)
startButton.addEventListener("click", ()=>{timerSite.start()})