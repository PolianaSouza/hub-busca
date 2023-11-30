import axios from "axios";

export function setupApi() {
  const api = axios.create({
    baseURL: "https://api.github.com/",
  });

  return api;
}
