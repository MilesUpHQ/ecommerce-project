import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_BASE_URL + `/api/`
      : process.env.REACT_APP_BASE_URL + `/api/`,
});

export default instance;
