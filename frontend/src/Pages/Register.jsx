import React,{useState} from "react";
import {toast} from 'react-toastify';
import Api from "../Api/Api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Register=()=>{
    const [formData,setFormData]=useState({
        username:'',
        password:'',
        confirm:'',
        email:'',
    })
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setFormData(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    const [pass,setPass]=useState(false)

        const handlepass=()=>{
            setPass(!pass)
        }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if (!formData.username || !formData.password || !formData.confirm || !formData.email){
            toast.error('All Fields Are Manditory')
            return  
        }
        const data=new FormData()
        data.append('username',formData.username)
        data.append('password',formData.password)
        data.append('confirm',formData.confirm)
        data.append("email",formData.email)
        try{
            const response=await Api.post('register/',data);
            console.log(response.data.res)
            toast.success(response.data.res)
            navigate('/login')
        }catch(error){
            console.error(error.response.data)
            const err=error.response?.data?.non_field_errors
            const errs=error.response?.data?.password
            const user=error.response?.data?.username
            if (err &&err.length>0           ){
                toast.error(err[0])
            }
            if  (errs && errs.length>0){
                toast.error(errs[0])
            }
            if (user && user.length>0){
                toast.error(user[0])
            }
        }

        
    }
    return(
        <div className="flex  justify-center items-center bg-gray-200 min-h-screen">
            <div className="">
                 <div className="w-60 flex  mb-5 ml-10 ">
                <img src="https://tailwebs.com/wp-content/uploads/2023/03/Group-222.png"/>
                <Link to={'/'} className="bg-gray-500 ml-10 rounded hover:bg-gray-300 hover:text-black font-medium text-white py-3 px-5 ">Home</Link>
                 
            </div>
            <form onSubmit={handleSubmit} className="bg-white w-96 rounded  grid p-10">
                <div className="mb-5">
                    <label className="mb-1 font-medium block">Username</label>
                    <input type="text" className="w-full border border-gray-400 p-2" name="username" value={formData.username} onChange={handleChange} placeholder="username" />
                </div>
                <div className="mb-5">
                    <label className="mb-1 font-medium block">Email</label>
                     <input type="email" className="w-full border border-gray-400 p-2" name="email" value={formData.email} onChange={handleChange} placeholder="email"/>
                </div>
                <div className="mb-5">
                    <label className="mb-1 font-medium block">Password</label>
                    <input  className={`w-full border border-gray-400 p-2 `} type={`${pass ? 'text':'password'}`} name="password" value={formData.password} onChange={handleChange} placeholder="password"/>
               <img onClick={handlepass} className={`absolute cursor-pointer -mt-8 ml-66 `} width="25" height="20" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password"/>
               
                </div>
               <div className="mb-5">
                <label className="mb-1 font-medium block">Confirm</label>
                <input   type={`${pass ? 'text':'password'}`} className="w-full border border-gray-400 p-2" name="confirm" value={formData.confirm} onChange={handleChange} placeholder="confirm"/>
                <img onClick={handleChange} className="absolute cursor-pointer -mt-8 ml-66 " width="25" height="20" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password"/>
                </div> 
                <button className="bg-green-500 mb-5 text-white px-3 py-4 hover:bg-green-300 cursor-pointer hover:text-black font-bold" type="submit">Register</button>
            
                <div className="flex justify-between">
                    <span>Already Registered ?</span><Link className=" justify-end text-blue-500 underline" to={'/login'}>Login</Link>
                </div>
            </form>
            </div>
           
        </div>
    )

}
export default Register;