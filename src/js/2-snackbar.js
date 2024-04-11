// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";




const form = document.querySelector(".form");

console.dir(form.elements.state);

form.addEventListener("submit", handleSubmit)

function handleSubmit (event) {
    event.preventDefault();

    const delay = form.elements.delay.value
    const state = form.elements.state.value

    createPromise(delay, state)

    form.reset()
}

function createPromise(delay, state) {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if(state === "fulfilled"){
                resolve(`✅ Fulfilled promise in ${delay}ms`)
            } 

            reject(`❌ Rejected promise in ${delay}ms`)
        }, delay) 
    }).then((message) =>{
        iziToast.show({
            message,
            color: 'green',
            position: 'topRight'
        });
    }).catch((error) =>{
        console.log(error);
        iziToast.show({
            message: error,
            color: 'red',
            position: 'topRight'
        });
    })
}
