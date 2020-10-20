import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:8000/",
});
const client = applyCaseMiddleware(instance);

export default client;
