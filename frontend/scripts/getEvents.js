import { connection } from './api.js';

async function getEventsList() {
  const url = '/events';

  try {
    const events = await connection.sendRequest(url);
    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function renderEvents(events) {
  const eventList = document.getElementById('event_list');
  eventList.innerHTML = '';

  events.forEach((event) => {
    const li = document.createElement('li');
    li.textContent = event.name;

    const location = document.createElement('ul');
    const locationItem = document.createElement('li');
    locationItem.textContent = event.local;
    location.appendChild(locationItem);

    li.appendChild(location);
    eventList.appendChild(li);
  });
}
const init = async () => {
    const events = await getEventsList();
    renderEvents(events);
  };
export { getEventsList, renderEvents, init };
