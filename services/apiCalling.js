export default async function callApi(endpoint, method) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const api_token = process.env.NEXT_PUBLIC_API_TOKEN;
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "api-token": `${api_token}`,
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return await fetch(apiUrl + endpoint, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}
