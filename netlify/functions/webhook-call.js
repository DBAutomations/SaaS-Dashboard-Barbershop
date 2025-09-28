exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body || "{}");
  console.log("Received payload:", data);

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, received: data }),
  };
};
