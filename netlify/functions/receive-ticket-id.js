const allowedOrigins = [
  "https://1085214.apps.zdusercontent.com",
  "https://dashing-churros-ab5aaa.netlify.app",
];

export default async function handler(request, context) {
  const origin = request.headers.get("origin");

  // Dynamiczne ustawianie nagłówków CORS
  let allowOrigin = "*"; // Domyślnie zezwól na dowolny origin
  if (origin && allowedOrigins.includes(origin)) {
    allowOrigin = origin; // Ustaw nagłówek na dopuszczony origin
  }

  if (request.method === "OPTIONS") {
    // Obsługa preflight request
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": allowOrigin,
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method === "GET") {
    console.log("Handling GET request...");
    return new Response(JSON.stringify({ message: "GET request received" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowOrigin,
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method === "POST") {
    console.log("Handling POST request...");
    try {
      const body = await request.json();
      const ticketId = body.ticketId;

      if (!ticketId) {
        return new Response(
          JSON.stringify({ message: "ticketId is required." }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": allowOrigin,
              "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
            },
          }
        );
      }

      console.log("Received ticketId:", ticketId);

      return new Response(
        JSON.stringify({
          message: "Ticket ID received successfully!",
          ticketId: ticketId,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowOrigin,
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    } catch (error) {
      console.error("Error processing POST request:", error);
      return new Response(
        JSON.stringify({ message: "Error: " + error.toString() }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowOrigin,
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }
  }

  console.log("Method Not Allowed:", request.method);
  return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
    status: 405,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export const config = {
  path: "/*", // Obsługuje wszystkie ścieżki
};
