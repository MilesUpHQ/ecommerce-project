import axios from "axios";
const instance = axios.create({
  baseURL: "https://ecom-server1.herokuapp.com/api/",
});

export default instance;
