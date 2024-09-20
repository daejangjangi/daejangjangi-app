import { AxiosHeaders } from "axios";

export type RequestType = {
    path: string;
    header?: AxiosHeaders;
    body?: Objects;
}

type Objects = {
    [key: string]: string;
}