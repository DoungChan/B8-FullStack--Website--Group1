import serverApiClient from "@/utils/serverApiClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await serverApiClient.post("/auth/register", req.body, {
        headers: req.headers,
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
