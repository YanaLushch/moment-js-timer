import * as moment from '../node_modules/moment/moment';

const heading = document.createElement('h1');
const time = document.createElement('p');
const content = document.querySelector('.content');
const decrease = document.createElement('button');
const increase = document.createElement('button');
const setTimer = document.createElement('button');
heading.innerHTML = 'Timer';
time.innerHTML = '5';
setTimer.id = 'set';
decrease.id = 'decrease';
increase.id = 'increase';
decrease.innerHTML = 'Decrease';
increase.innerHTML = 'Increase';
setTimer.innerHTML = 'Set';
content.appendChild(heading);
content.appendChild(decrease);
content.appendChild(time);
content.appendChild(increase);
content.appendChild(setTimer);

content.addEventListener('click', (event) => {
  let timeInt = parseInt(time.textContent, 10);
  if (event.target.id === 'decrease') {
    if (time.textContent > '0') {
      timeInt -= 1;
      time.innerHTML = timeInt.toString();
    }
  } else if (event.target.id === 'increase') {
    timeInt += 1;
    time.innerHTML = timeInt.toString();
  }
  if (event.target.id === 'set') {
    let setTime = moment(time.textContent, 'm');
    time.innerHTML = setTime.format('m:ss');
    const timer = setInterval(() => {
      const subtraction = setTime.subtract(1, 'seconds');
      setTime = subtraction;
      time.innerHTML = subtraction.format('m:ss');
      if (time.textContent === '0:00') {
        clearInterval(timer);
      }
    }, 1000);
  }
});
