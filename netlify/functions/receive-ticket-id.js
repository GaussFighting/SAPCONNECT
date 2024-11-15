// netlify/functions/receive-ticket-id.js

exports.handler = async (event, context) => {
  const allowedOrigins = [
    "https://1085214.apps.zdusercontent.com",
    "https://dashing-churros-ab5aaa.netlify.app",
  ];

  const origin = event.headers["origin"];
  let allowOrigin = "*";
  if (allowedOrigins.includes(origin)) {
    allowOrigin = origin;
  }

  // Obsługuje OPTIONS request (preflight)
  if (event.httpMethod === "OPTIONS") {
    console.log("Handling OPTIONS request...");
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": allowOrigin,
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ message: "CORS preflight request successful" }),
    };
  }

  // Obsługuje POST request
  if (event.httpMethod === "POST") {
    console.log("Handling POST request...");
    try {
      const body = JSON.parse(event.body);
      const ticketId = body.ticketId;

      if (!ticketId) {
        console.log("ticketId is required.");
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "ticketId is required." }),
          headers: {
            "Access-Control-Allow-Origin": allowOrigin,
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        };
      }

      console.log("Received ticketId:", ticketId);

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Ticket ID received successfully!",
          ticketId: ticketId,
        }),
        headers: {
          "Access-Control-Allow-Origin": allowOrigin,
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      };
    } catch (error) {
      console.error("Error processing POST request:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error: " + error.toString() }),
        headers: {
          "Access-Control-Allow-Origin": allowOrigin,
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      };
    }
  }

  console.log("Method Not Allowed:", event.httpMethod);
  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method Not Allowed" }),
    headers: {
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  };
};
