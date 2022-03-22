import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_BASE_URL + `/api/`
      : process.env.REACT_APP_BASE_URL + `/api/`,
});

instance.interceptors.response.use(
  (res) => {
    console.log("Valid response", res);
    // Add configurations here
    if (res.status === 401) {
      console.log("401");
      localStorage.removeItem("ecom_token");
      window.location.href = "/login";
    }
    return res;
  },
  (err) => {
    console.log("Invalid response", err);
    if (err.response.status === 401) {
      localStorage.removeItem("ecom_token");
      window.location.href = "/login";
    }
    return JSON.stringify(err);
  }
);
export default instance;
