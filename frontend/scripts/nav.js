// Select the header container element
var headerContainer = document.getElementById('nav_head');

// Create an unordered list element
var ul = document.createElement('ul');

// Create an array of page names and their corresponding URLs
var pages = [
  { name: 'Home', url: 'index.html' },
  { name: 'View Events', url: 'view.html' },
  { name: 'Add Event', url: 'add.html' },
  { name: 'Update Event', url: 'update.html' },
  { name: 'Delete Event', url: 'delete.html' }
];

// Get the current page's URL
var currentPageUrl = window.location.pathname;

// Iterate over the pages array and create the navigation links
pages.forEach(function(page) {
  // Create a list item for each link
  var li = document.createElement('li');

  // Create the link
  var link = document.createElement('a');
  link.href = page.url;
  link.textContent = page.name;

  // Disable the link if it matches the current page's URL
  if (currentPageUrl.includes(page.url)) {
    link.classList.add('disabled');
    link.removeAttribute('href');
  }

  // Append the link to the list item
  li.appendChild(link);

  // Append the list item to the unordered list
  ul.appendChild(li);
});

// Append the unordered list to the header container
headerContainer.appendChild(ul);
