const state = {
  checkpoints: [
    { name: 'Main Gate', status: 'passed', detail: 'Passed at 8:05 AM', waiting: 0 },
    { name: 'A Checkpoint', status: 'current', detail: 'Arriving in 8 min', waiting: 6 },
    { name: 'B Checkpoint', status: 'pending', detail: 'Approximately 15 min', waiting: 2 },
    { name: 'College Campus', status: 'pending', detail: 'Final stop', waiting: 0 },
  ],
  selected: 'A Checkpoint',
  waiting: false,
  tripActive: true,
};

const list = document.querySelector('#checkpointList');
const totalWaiting = document.querySelector('#totalWaiting');
const waitingButton = document.querySelector('#waitingButton');
const waitingHelper = document.querySelector('#waitingHelper');

function renderCheckpoints() {
  list.innerHTML = state.checkpoints.map((checkpoint) => {
    const icon = checkpoint.status === 'passed' ? '✓' : checkpoint.status === 'current' ? '●' : '○';
    const count = checkpoint.waiting ? `<span class="count">${checkpoint.waiting} waiting</span>` : '';
    return `<div class="checkpoint ${checkpoint.status}"><span class="checkpoint-icon">${icon}</span><div><strong>${checkpoint.name}</strong><span>${checkpoint.detail}</span></div>${count}</div>`;
  }).join('');
  totalWaiting.textContent = state.checkpoints.reduce((sum, stop) => sum + stop.waiting, 0);
}

function renderWaitingState() {
  waitingButton.classList.toggle('is-waiting', state.waiting);
  waitingButton.innerHTML = state.waiting ? 'You are marked as waiting <span>✓</span>' : 'I’m waiting here <span>→</span>';
  waitingHelper.textContent = state.waiting
    ? 'The driver can now see one more student at A Checkpoint. Tap again to cancel.'
    : 'The driver will see the number of students waiting, not your personal details.';
}

waitingButton.addEventListener('click', () => {
  const checkpoint = state.checkpoints.find((stop) => stop.name === state.selected);
  state.waiting = !state.waiting;
  checkpoint.waiting += state.waiting ? 1 : -1;
  renderCheckpoints();
  renderWaitingState();
});

document.querySelector('#mapButton').addEventListener('click', () => {
  document.querySelector('#mapPanel').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('#refreshButton').addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.textContent = '✓ Updated';
  document.querySelector('#updatedAt').textContent = 'Updated just now';
  window.setTimeout(() => { button.textContent = '↻ Refresh'; }, 1500);
});

document.querySelector('#endTripButton').addEventListener('click', (event) => {
  state.tripActive = false;
  document.querySelector('#driverStatus').textContent = 'Trip ended · GPS sharing off';
  document.querySelector('#driverIndicator').style.background = '#aeb8c5';
  event.currentTarget.textContent = 'Trip ended';
  event.currentTarget.disabled = true;
});

renderCheckpoints();
renderWaitingState();
