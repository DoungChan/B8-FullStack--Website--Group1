import axios from "axios";

const serverApiClient = axios.create({
  baseURL: "http://localhost:8080/promo_kh",
});

serverApiClient.defaults.headers.common["Api-Token"] =
  "scbnsk289248nscsndk298km";

export default serverApiClient;
