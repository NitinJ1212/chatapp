import React, { useState } from 'react'
import { Signup as SignupFromAPI } from '../../api/auth'


interface SignupProps {
    setLoginType: (type: string) => void; // Define the type for the setLoginType function
}

const Signup: React.FC<SignupProps> = ({ setLoginType }) => {
    const [data, setData] = useState({ username: "", mobile: "", password: "" })

    const handleChange = (e: any) => {
        const { name, value } = e.target
        const key = e.key
        console.log(key);
        // if (name === "mobile" && data.mobile.length > 9) {
        //     // setData({ data })
        //     return alert("mobile only 10 digit allow")
        // }
        // else {
        // }
        setData({ ...data, [name]: value })
    }
    const handleSignup = async () => {
        const response = await SignupFromAPI(data);
        if (response.status) {
        } else {

        }

    }
    return (
        <div>
            <label style={{ fontSize: "14px" }} >Name</label><br />
            <input type='text' name="username" onChange={handleChange} value={data.username} /><br />
            <label style={{ fontSize: "14px" }}>Mobile</label><br />
            <input type='number' max={9999999999} name="mobile" onChange={handleChange} value={data.mobile} /><br />
            <label style={{ fontSize: "14px" }}>Password</label><br />
            <input type='password' name="password" onChange={handleChange} value={data.password} />
            <button className='btn btn-success' onClick={handleSignup}>Signup</button>
            <button className='btn btn-success' onClick={() => setLoginType("signin")}>Already account</button>
        </div>
    )
}


export default Signup;

