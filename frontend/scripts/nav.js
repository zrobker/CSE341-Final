// Select the header container element
var headerContainer = document.getElementById('page_head');

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
  // Create the link
  var link = document.createElement('a');
  link.href = page.url;
  link.textContent = page.name;

  // Disable the link if it matches the current page's URL
  if (currentPageUrl.includes(page.url)) {
    link.classList.add('disabled'); // Add a CSS class to style the disabled link
    link.removeAttribute('href'); // Remove the href attribute to disable the link
  }

  // Append the link to the header container
  headerContainer.appendChild(link);
});
