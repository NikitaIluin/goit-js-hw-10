import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
let inputRadioValue = null;
let delay = null;


form.addEventListener("submit", (event) => {
    event.preventDefault();
    inputRadioValue = event.target.elements.state.value;
    delay = event.target.elements.delay.value;
     const promise = createPromise(inputRadioValue ,delay);
    promise.then().catch();
});


function createPromise(inputRadioValue, delay) {
    const promise = new Promise((resolve, reject) => {

        setTimeout(() => {
            if (inputRadioValue === "fulfilled") {
                resolve(iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`
        }));
            } else if (inputRadioValue === "rejected") {
                reject( iziToast.error({
            message: `❌ Rejected promise in ${delay}ms`
        }));
            }
        }, delay);
    });
    return promise;
}