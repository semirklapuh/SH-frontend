import axios from "axios";
import Cookies from "js-cookie";

const URL = "http://localhost:8000/api/v1";

export default axios.create({
  baseURL: URL,
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
  mode: "cors",
});
