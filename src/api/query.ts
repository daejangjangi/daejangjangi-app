import {useMutation} from "@tanstack/react-query";
import { get, post } from "./funcs";

const useGet = () => {
    return useMutation({
        mutationFn: get,
    })
}

const usePost = () => {
    return useMutation({
        mutationFn: post,
    })
}

export {useGet, usePost};