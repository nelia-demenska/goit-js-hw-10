import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');


form.addEventListener('submit', function(event) {
event.preventDefault(); 

const delay = parseInt(form.elements.delay.value);
const state = form.elements.state.value;

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
    if (state === 'fulfilled') {
        resolve(delay);
    } else {
        reject(delay);
    }
    }, delay);
});

promise
    .then((delay) => {
    iziToast.success({
        title: '✅ Fulfilled',
        message: `Promise in ${delay}ms`,
        position: 'topRight',
    });
    })
    .catch((delay) => {
    iziToast.error({
        title: '❌ Rejected',
        message: `Promise in ${delay}ms`,
        position: 'topRight',
    });
    });
});
