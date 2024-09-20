import { RequestType } from "../types"
import axiosInstance from "./axios"


const get = async ({path, header}: RequestType) => {
    const {data} = await axiosInstance.get(`${path}`, {
        headers: header
    });
    return data;
}


const post = async ({path, header, body}: RequestType) => {
    const {data} = await axiosInstance.post(`${path}`, body, {
        headers: header,
    });

    return data;
}

export {get, post};