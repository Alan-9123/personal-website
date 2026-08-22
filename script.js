document.querySelector('#year').textContent = new Date().getFullYear();

const flightDemo = document.querySelector('.flight-demo');
const flightToggle = document.querySelector('.flight-toggle');

flightToggle.addEventListener('click', () => {
  const isPaused = flightDemo.classList.toggle('is-paused');
  flightToggle.textContent = isPaused ? 'Resume flight' : 'Pause flight';
  flightToggle.setAttribute('aria-pressed', String(isPaused));
});

const blastToggle = document.querySelector('.blast-toggle');
const missile = document.querySelector('.missile');
let blastTimer;

blastToggle.addEventListener('click', () => {
  const isActive = flightDemo.classList.contains('is-launching') || flightDemo.classList.contains('is-exploding');

  if (isActive) {
    clearTimeout(blastTimer);
    flightDemo.classList.remove('is-launching', 'is-exploding');
    blastToggle.textContent = 'Launch blast';
    flightToggle.disabled = false;
    return;
  }

  const route = flightDemo.getBoundingClientRect();
  const drone = document.querySelector('.drone').getBoundingClientRect();
  missile.style.setProperty('--missile-x', `${drone.left - route.left + drone.width / 2}px`);
  missile.style.setProperty('--missile-y', `${drone.top - route.top + drone.height / 2}px`);
  flightDemo.classList.add('is-launching');
  blastToggle.textContent = 'Impact incoming';
  flightToggle.disabled = true;

  blastTimer = setTimeout(() => {
    flightDemo.classList.remove('is-launching');
    flightDemo.classList.add('is-exploding');
    blastToggle.textContent = 'Reset planet';
  }, 650);
});
