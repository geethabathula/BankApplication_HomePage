const cards = document.querySelectorAll('.card');
const options = {};

const observer = new IntersectionObserver(callbackFunc, options);

function callbackFunc(entries) {
    entries.forEach(entry => entry.target.classList.toggle('show'));
}

cards.forEach(card => observer.observe(card));
