import  {createConnection} from './api';
async function postEvent(eventData) {


    const connection = createConnection;
    const url = '/events';
    const method = 'POST';

    try {
      const response = await sendRequest(url, method, eventData);
      
      if (response.success) {
        // Show success message or perform any other actions
        console.log('Event posted successfully!');
      } else {
        // Show error message or handle error case
        console.error('Failed to post event:', response.error);
      }
    } catch (error) {
      console.error('Failed to post event:', error);
    }
  }
  
  module.exports = {postEvent}