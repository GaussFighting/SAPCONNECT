exports.handler = async (event) => {
  // Just to check: does the HANA provides only authentication/login endpoint or maybe /refresh endpoint as well? :)
  try {
    const { ticketId, endpoint } = JSON.parse(event.body);
    const authUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8888/.netlify/functions/auth"
        : `${process.env.URL}/.netlify/functions/auth`; // there is no "URL" in .env (?) - btw. URL is a not accurate name for a env var ;) You may have 500 envs like URL :D
    const authResponse = await fetch(authUrl);
    const authData = await authResponse.json();
    const token = authData.access_token;

    if (!token) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to get the access token" }),
      };
    }

    const apiBase = "https://hft71.eu/api/v1/zendesk"; // security issue :(( NO URLs in the code are allowed :(
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
