import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Api from "../Api/Api";
import Cookie from 'js-cookie';
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const [formData,setFormData]=useState({
        username:'',
        password:''
    })
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setFormData(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if (!formData.username || ! formData.password){
            toast.error('All Fields Are Mandatory');
            return;
        }
        const data=new FormData();
        data.append('username',formData.username)
        data.append('password',formData.password)
        try{
            const response=await Api.post('login/',data);
            console.log(response.data.res)
            toast.success(response.data.res)

            Cookie.set('accesstoken',response.data.accesstoken)
            Cookie.set('refreshtoken',response.data.refreshtoken)
            navigate('/dashboard')

        }catch(error){
            console.error(error.response.data);
            const err=error.response?.data?.non_field_errors
            if (err && err.length>0){
                toast.error(err[0]);
            }
        }
    }

    return (
         <div className="flex  justify-center items-center bg-gray-200 min-h-screen">
            <div className="">
                 <div className="w-60 mb-5 flex ml-10 ">
                <img src="https://tailwebs.com/wp-content/uploads/2023/03/Group-222.png"/>
                <Link to={'/'} className="bg-gray-500 ml-10 rounded hover:bg-gray-300 hover:text-black font-medium text-white py-3 px-5 ">Home</Link>
            </div>
            <form  onSubmit={handleSubmit} className="bg-white w-96 rounded  grid p-10">
                <div className="mb-5">
                    <label className="mb-1 font-medium block">Username</label>
                    <input onChange={handleChange} className="w-full border border-gray-400 p-2" name="username" value={formData.username}  placeholder="username" />
                </div>
               
                <div className="mb-5">
                    <label className="mb-1 font-medium block">Password</label>
                    <input type="password" onChange={handleChange} className="w-full border border-gray-400 p-2" name="password" value={formData.password}  placeholder="password"/>
               
                </div>
               
                <button  className="bg-green-500 mb-5 text-white px-3 py-4 hover:bg-green-300 cursor-pointer hover:text-black font-bold" type="submit">Login</button>
            
                <div className="flex justify-between">
                    <span>New User ?</span><Link className=" justify-end text-blue-500 underline" to={'/register'}>Register</Link>
                </div>
            </form>
            </div>
           
        </div>
    )
}

export default Login;