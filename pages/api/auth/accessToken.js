export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const apiUrl = process.env.API_URL;
      const apiToken = process.env.API_TOKEN;

      const response = await fetch(`${apiUrl}/auth/access-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Token": apiToken,
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();

      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
