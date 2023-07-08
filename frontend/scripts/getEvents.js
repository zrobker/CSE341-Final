import  {createConnection} from './api';
async function getEventsList() {
    const url = '/events';
    const connection = createConnection
    try {
      const events = await connection.sendRequest(url);

      // Sort events by date created
      events.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      const eventList = document.getElementById('event_list');

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
    } catch (error) {
      console.error(error);
    }
  };
module.exports = {getEventsList};