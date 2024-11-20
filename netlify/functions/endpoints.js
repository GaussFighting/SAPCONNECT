exports.handler = async (event) => {
  try {
    const { ticketId, endpoint } = JSON.parse(event.body);

    const authResponse = await fetch(
      "http://localhost:8888/.netlify/functions/auth"
    );
    const authData = await authResponse.json();
    const token = authData.access_token;

    if (!token) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to get access token" }),
      };
    }

    const apiBase = "https://hft71.eu/api/v1/zendesk";
    let url;
    if (endpoint === "clientinfo") {
      url = `${apiBase}/clientinfo?ticketId=${ticketId}`;
    } else if (endpoint === "currentorders") {
      url = `${apiBase}/currentorders?ticketId=${ticketId}`;
    } else if (endpoint === "restorders") {
      url = `${apiBase}/restorders?ticketId=${ticketId}`;
    } else if (endpoint === "shipment") {
      url = `${apiBase}/shipment?ticketId=${ticketId}`;
    } else if (endpoint === "invoices") {
      url = `${apiBase}/invoices?ticketId=${ticketId}`;
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid endpoint" }),
      };
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `${response.status} Brak danych w SAP`,
        }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error" }),
    };
  }
};
