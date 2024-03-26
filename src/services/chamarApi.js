import axios from "axios";

export const recuperarApi = async (
    method, 
    url, 
    setState, 
    id = ""
) => {
    await axios[method](`http://192.168.0.122:3300/${url}/${id}`)
    .then(res => {
        setState(res.data);
    })
    .catch(e => {
        console.log(e);
    })
};