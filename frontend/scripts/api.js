const baseURL = 'https://cse341-final-twkm.onrender.com';

// Connection Function
function createConnection() {
  // Function to send a request to the API server
  async function sendRequest(url, method = 'GET', data = null) {
    try {
      const response = await fetch(`${baseURL}${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: data ? JSON.stringify(data) : null
      });

      if (!response.ok) {
        throw new Error('Request failed.');
      }

      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  // Return the sendRequest function
  return sendRequest;
}

// Create a connection instance
const connection = createConnection();

export { connection };