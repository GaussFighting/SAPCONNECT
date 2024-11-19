const axios = require("axios");

const SAP_HANA_API_URL = "https://hana-api-url.com";
const AUTH_HEADERS = {
  Authorization:
    "Basic " + Buffer.from("your_login:your_api_key").toString("base64"),
  "Content-Type": "application/json",
};

exports.handler = async function (event, context) {
  const { ticket_id } = event.queryStringParameters;

  if (!ticket_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Brak ticket_id w zapytaniu" }),
    };
  }

  try {
    const response = await axios.get(
      `${SAP_HANA_API_URL}/client-info?ticket_id=${ticket_id}`,
      { headers: AUTH_HEADERS }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ ticket_id, data: response.data }),
    };
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Błąd serwera" }),
    };
  }
};

// const fetchTicketData = async (ticketId) => { // kod na front, ogarnąć w useeffectcie, dodać spinnera
//     try {
//       const response = await fetch(`/api/client-info?ticket_id=${ticketId}`);
//       const data = await response.json();
//       console.log("Data:", data);
//     } catch (error) {
//       console.error("Błąd podczas pobierania danych:", error);
//     }
//   };
