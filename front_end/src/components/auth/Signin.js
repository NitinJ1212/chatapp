import React, { useState } from 'react'
import { Login } from '../api/authapi'
export default function Signin() {
    const [data, setData] = useState({ username: "", mobile: "", password: "" })

    const handleChange = (e) => {
        const { name, value } = e.target
        const key = e.key
        // if (name === "mobile" && data.mobile.length > 9) {
        //     // setData({ data })
        //     return alert("mobile only 10 digit allow")
        // }
        // else {
        // }
        setData({ ...data, [name]: value })
    }
    const handleLogin = async () => {
        const response = await Login(data);
        if (response?.status) {
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
            <button className='btn btn-success' onClick={handleLogin}>Signin</button>
        </div>
    )
}



