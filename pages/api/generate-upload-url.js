export default async function handler(req, res) {
  if (req.method === "GET") {
    const apiUrl = process.env.API_URL;
    const apiToken = process.env.API_TOKEN;

    try {
      const response = await fetch(`${apiUrl}/generate-upload-url`, {
        method: "GET",
        headers: {
          "Api-Token": apiToken,
          Authorization: req.headers.authorization,
        },
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
