import axios from "axios"

const baseurl = "http://localhost:5000/"

// const cookieName = 'chatapp-token';
// const cookieValue = document.cookie.split('; ').find(row => row.startsWith(cookieName)).split('=')[1];

export const Signup = async (data) => {
    const response = await axios.post(`${baseurl}user/signup`, data);
    return response
}


export const Login = async (dt) => {
    try {
        const response = await axios.post(`${baseurl}user/login`, dt, { withCredentials: true });
        return response
    } catch (error) {
        console.log(error)
    }
}
export const getUserDetail = async () => {
    try {
        const response = await axios.post(`${baseurl}user/detail`, {}, { withCredentials: true });
        return response.data
    } catch (error) {
        console.log(error)
    }
}
