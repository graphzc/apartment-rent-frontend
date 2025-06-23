import axios from "axios";
import { env } from 'next-runtime-env';

const BASE_API_URL = env('NEXT_PUBLIC_BASE_API_URL');

axios.defaults.baseURL = BASE_API_URL;
axios.defaults.headers["Content-type"] = "application/json";
export default axios;
