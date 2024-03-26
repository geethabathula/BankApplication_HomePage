'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const section1 = document.querySelector('#section--1');


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

//old way
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/*
//Smooth Scrolling Implementation
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  //deprecated or older way console.log('Current scroll(X/Y)', window.pageXOffset, window.pageYOffset);
  console.log('Current scroll(X/Y)', window.screenX, window.scrollY);
  // X=0 means there is no horizantal scrolling
  // Y=0 means there is no vertical scrolling

  //shows the height and width of viewport coordinates
  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);

  //this doesn't work as s1coords are relative
  //window.scrollTo(s1coords.left, s1coords.top);

  //Scrolling
  //the current position + currentscroll
  //window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY);

  //adding smooth animation old way
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  //modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});
*/

// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  //as we are implementing the event delegation with closest when
  //u click with in the element it might return null
  //so we are implememting the
  //Guard clause-an if statement which will retuen early if condition
  //is matched
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
//we use opposites mostly when we want to remove  
//what we activated while hovering
//opposite of mouseover is mouseout
//opposite of mouseenter is mouseleave
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5); //one way
// });

//remember that the bind method
//creates a copy of the function that it's called on,
//and it will set the this keyword in this function call
//to whatever value that we pass into bind

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky Navigation Implementation
/*
//old school
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

//this way handling sticky navigation is not recommended
//because this event is fired even for a small scroll
//this delays the performance. Hence we use Intersection Observer API
window.addEventListener('scroll', function () {
  console.log(window.scrollY);
  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  }
  else {
    nav.classList.remove('sticky');
  }
});
*/
//Sticky Navigation Implementation : Intersection Observer API
const observerCallback = function () {

}
const observerOptions = {
  root: null, //it is the element that we want our target element to intersect
  threshold: 0.1,//(10%) is the percentage the observer callback will be called
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(section1);