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
//Creates list of events for inserting into website.  Will figure out how to make this a list.
function renderEvents(events) {
  const eventList = document.getElementById('event_list');
  eventList.innerHTML = '';

  events.forEach((event) => {
    const li = document.createElement('li');

    // Create a link with the event name as the display text
    const link = document.createElement('a');
    link.textContent = event.name;

    // Set the link's href to the URL of the page that displays the event by ID
    link.href = `/events/${event.id}`;

    // Append the link to the list item
    li.appendChild(link);

    // Create a sublist for the location
    const location = document.createElement('ul');
    const locationItem = document.createElement('li');
    locationItem.textContent = event.location;
    location.appendChild(locationItem);

    // Append the sublist to the list item
    li.appendChild(location);

    // Append the list item to the event list
    eventList.appendChild(li);
  });

  return eventList;
}


//init
const init = async () => {
    const events = await getEventsList();
    renderEvents(events);
  };
export { getEventsList, renderEvents, init };
