import axios from "axios"

const baseurl = "http://localhost:5000/"

const cookieName = 'chatapp-token';
const cookieValue = "";
// console.log(document.cookie.split('; '), "ppppppppppppppppppppppp")

export const Signup = async (data) => {
    const response = await axios.post(`${baseurl}user/signup`, data);
    return response
}


export const Login = async (dt) => {
    try {
        const response = await axios.post(`${baseurl}user/login`, dt,
            );
        return response
    } catch (error) {
        console.log(error)
    }
}
