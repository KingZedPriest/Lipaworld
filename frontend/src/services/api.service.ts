import axios from "axios";

//Import the Base URL
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Axios instance for unauthenticated requests
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

//Gift a User
export const giftUserFn = async (data: VoucherApiData) => {
    const response = await axiosInstance.post("gift/create", data);
    return response.data;
};