import axios from "axios";

export const recuperarApi = async (
    method, 
    url, 
    setState, 
    data
) => {
    if(method === "get") {
        await axios.get(`http://192.168.0.122:3300/${url}`)
        .then(res => {
            setState(res.data);
        })
        .catch(e => {
            console.log(e);
        })
    } else if (method === "post") {
        console.log("você escolheu o método post")
    } else if (method === "put") {
        console.log("você escolheu o método put")
    } else if (method === "delete") {
        console.log("você escolheu o método delete")
    }
};