const handler = async (event) => {
  console.log("Received event:", event); // Logowanie, aby zobaczyć dokładnie, co przychodzi

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // Można ograniczyć do konkretnej domeny
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Obsługa metody OPTIONS (preflight request)
  if (event.httpMethod === "OPTIONS") {
    console.log("Handling OPTIONS request...");
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "CORS preflight request successful" }),
      headers: corsHeaders,
    };
  }

  // Obsługa metody POST
  if (event.httpMethod === "POST") {
    console.log("Handling POST request...");
    try {
      const body = JSON.parse(event.body); // Parsowanie ciała żądania
      const ticketId = body.ticketId; // Pobranie ticketId

      if (!ticketId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "ticketId is required." }),
          headers: corsHeaders, // Dodajemy nagłówki CORS do błędów
        };
      }

      console.log("Received ticketId:", ticketId); // Logowanie ticketId

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
        headers: corsHeaders, // Dodajemy nagłówki CORS do błędów
      };
    }
  }

  // Jeśli metoda nie jest ani OPTIONS ani POST, zwróć błąd
  console.log("Method Not Allowed:", event.httpMethod);
  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method Not Allowed" }),
    headers: corsHeaders, // Dodajemy nagłówki CORS do błędów
  };
};

module.exports = { handler };
