const handler = async (event) => {
  console.log("Received event:", event);

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (event.httpMethod === "GET") {
    console.log("Handling GET request...");
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "GET request received" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }

  if (event.httpMethod === "OPTIONS") {
    console.log("Handling OPTIONS request...");
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "CORS preflight request successful" }),
      headers: corsHeaders,
    };
  }

  if (event.httpMethod === "POST") {
    console.log("Handling POST request...");
    try {
      const body = JSON.parse(event.body);
      const ticketId = body.ticketId;

      if (!ticketId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "ticketId is required." }),
          headers: corsHeaders,
        };
      }

      console.log("Received ticketId:", ticketId);

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: `Ticket ID received successfully!`,
          ticketId: ticketId,
        }),
        headers: corsHeaders,
      };
    } catch (error) {
      console.error("Error processing POST request:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error: " + error.toString() }),
        headers: corsHeaders,
      };
    }
  }

  console.log("Method Not Allowed:", event.httpMethod);
  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method Not Allowed" }),
    headers: corsHeaders,
  };
};

module.exports = { handler };
