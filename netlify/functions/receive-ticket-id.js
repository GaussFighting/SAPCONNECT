const handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Only POST requests are allowed.' }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      };
    }

    const body = JSON.parse(event.body);
    const ticketId = body.ticketId;

    if (!ticketId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'ticketId is required.' }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      };
    }

    console.log('Received ticketId:', ticketId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Ticket ID received successfully!`,
        ticketId: ticketId,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',  // Dopuszczenie pochodzenia (origin)
        'Access-Control-Allow-Methods': 'POST, OPTIONS',  // Dopuszczenie metod
        'Access-Control-Allow-Headers': 'Content-Type',  // Dopuszczenie nagłówków
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error: ' + error.toString() }),
    };
  }
};

module.exports = { handler };
