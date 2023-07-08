const headerContainer = document.getElementById('page_head');

// Create the home link
var homeLink = document.createElement('a');
homeLink.href = '../index.html';
homeLink.textContent = 'Home';
headerContainer.appendChild(homeLink);

// Create the view events link
var viewEventsLink = document.createElement('a');
viewEventsLink.href = '../view.html';
viewEventsLink.textContent = 'View Events';
headerContainer.appendChild(viewEventsLink);

// Create the add event link
var addEventLink = document.createElement('a');
addEventLink.href = '../add.html';
addEventLink.textContent = 'Add Event';
headerContainer.appendChild(addEventLink);

// Create the update event link
var updateEventLink = document.createElement('a');
updateEventLink.href = '../update.html';
updateEventLink.textContent = 'Update Event';
headerContainer.appendChild(updateEventLink);

// Create the delete event link
var deleteEventLink = document.createElement('a');
deleteEventLink.href = '../delete.html';
deleteEventLink.textContent = 'Delete Event';
headerContainer.appendChild(deleteEventLink);