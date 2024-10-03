import axios from "axios";
import Cookies from 'js-cookie';

const baseurl = "http://localhost:5000/"

const cookieName = 'chatapp-token';
// console.log(document.cookie.split('; ').find(row => row.startsWith(cookieName)), "ppppppppppppppppppppppp")
const cookiee = Cookies.get(cookieName);
console.log(cookiee, "ppppppppppppppppooooooo---------------------")
export const getAllFriendList = async () => {
    try {

        const response = await axios.post(`${baseurl}friend/list`, {}, {
            withCredentials: true, // Enable sending cookies with requests
        });
        console.log(response, "llllllllllllllllll");
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const Signup = async (data) => {
    const response = await axios.post(`${baseurl}user/signup`, data);
    return response
}

