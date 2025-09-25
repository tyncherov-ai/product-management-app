import axios from "axios";

const BASE_URL = "https://api.restful-api.dev/objects";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
