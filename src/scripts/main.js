'use strict';

const logo = document.querySelector('.logo');
const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  logo.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('F'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    showMeassge('success', 'First promise was resolved');
  })
  .catch(() => {
    showMeassge('error', 'First promise was rejected');
  });

secondPromise.then(() => {
  showMeassge('success', 'Second promise was resolved');
});

thirdPromise.then(() => {
  showMeassge('success', 'Third promise was resolved');
});

function showMeassge(type, message) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList = type;
  notification.innerText = message;

  body.appendChild(notification);
}
