import axios from "axios";

const baseurl = "http://localhost:5000/"


export const getMessages = async (receiver) => {
    try {
        const response = await axios.post(`${baseurl}message/list`, { receiver }, {
            withCredentials: true, // Enable sending cookies with requests
        });
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const sendMessages = async (message, receiver) => {
    try {
        const response = await axios.post(`${baseurl}message/send`, { message, receiver }, {
            withCredentials: true, // Enable sending cookies with requests
        });
        return response.data
    } catch (error) {
        console.log(error)
    }
}
