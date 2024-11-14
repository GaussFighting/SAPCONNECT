exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,  
        body: JSON.stringify({ message: 'Only POST requests are allowed.' }),
      };
    }
  
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (err) {
      return {
        statusCode: 400, 
        body: JSON.stringify({ message: 'Invalid JSON payload.' }),
      };
    }
  
    const ticketId = body.ticketId;
    console.log('Received ticketId:', ticketId);
  
    return {
      statusCode: 200, 
      body: JSON.stringify({ message: 'Ticket ID received successfully!', ticketId }),
    };
  };