import Router from "next/router";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ` + localStorage.getItem("accessToken"),
    //     "Api-Token": "scbnsk289248nscsndk298km",
    //   },
    // };

    try {
      const apiUrl = process.env.API_URL;
      const apiToken = process.env.API_TOKEN;
      const response = await fetch(`${apiUrl}/promotion/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.authorization,
          "Api-Token": apiToken,
        },
        body: JSON.stringify(req.body.body),
      });

      const data = await response.json();

      res.status(response.status).json(data);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
