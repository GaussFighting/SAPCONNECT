exports.handler = async () => {
  const loginUrl = "https://hft71.eu/api/v1/authentication/login";
  const username = process.env.HANA_USERNAME;
  const password = process.env.HANA_PASSWORD;

  let tokenData = null;

  if (!tokenData || Date.now() >= tokenData.expires_in) {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Authentication failed" }),
      };
    }

    const data = await response.json();

    const { access_token, expires_in, token_type } = data;

    if (!expires_in) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "expires_in is missing in the response",
        }),
      };
    }

    // Convert the expires_in string to a Date object and calculate the expiration time
    const expirationDate = new Date(expires_in);
    const expirationTimestamp = expirationDate.getTime(); // Get milliseconds since epoch

    tokenData = {
      access_token,
      expires_in: expirationTimestamp,
      token_type,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      access_token: tokenData.access_token,
      expires_in: tokenData.expires_in,
      token_type: tokenData.token_type,
    }),
  };
};
