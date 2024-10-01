import axios from "axios"

const baseurl = "http://localhost:5000/"

export const Signup = async (data: any) => {
    const response = await axios.post(`${baseurl}user/signup`, data);
    return response
}


export const Signin = async (dt: any) => {
    const response = await axios.post(`${baseurl}user/login`, dt);
    console.log(response, "ppppppppppppp============")
    return response
}
