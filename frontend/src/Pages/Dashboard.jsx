import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Api from '../Api/Api'; 
import Cookie from 'js-cookie';
import { useNavigate } from "react-router-dom";


const Dashboard=()=>{
    const [ismodal,setIsModal]=useState(false)
    const [updatemodal,setUpdateModel]=useState(false)
    const [currentid,setCurrentId] = useState(null)
    const navigate=useNavigate()

    const [formData,setFormData]=useState({
        username:'',
        subject:'',
        marks:''
    })
    const handleChange=(e)=>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    const handlefetch=async()=>{
        try{
            const response=await Api.get('viewdata/')
            console.log(response.data)
            setData(response.data.data)
        }catch(error){
            console.error(error.response?.data)
        }
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();

        if (!formData.username || !formData.subject || !formData.marks){
            toast.error("Please Fill All Fields")
            return;
        }

        const data=new FormData();
        data.append('name',formData.username);
        data.append('subject',formData.subject);
        data.append('marks',formData.marks);
        try{
            const response = await Api.post('createorupdate/',data)
            console.log(response.data.res);
            toast.success(response.data.res)
            setIsModal(false);    
            setFormData({
                username:'',
                subject:'',
                marks:''
            })     
            handlefetch() 
        }catch(error){
            console.error(error)
            toast.error('Something went wrong , please try again later.')
        }
    }



    const handleupdate=async(e)=>{
        e.preventDefault();

        if (!formData.username || !formData.subject || !formData.marks){
            toast.error("Please Fill All Fields")
            return;
        }

        const data=new FormData();
        data.append('name',formData.username);
        data.append('subject',formData.subject);
        data.append('marks',formData.marks);
        data.append('id',currentid)
        try{
            const response = await Api.patch('update/',data)
            console.log(response.data.res);
            toast.success(response.data.res)
            setUpdateModel(false);    
            setFormData({
                username:'',
                subject:'',
                marks:''
            })     
            setCurrentId(null)
            handlefetch() 
        }catch(error){
            console.error(error)
            toast.error('Something went wrong , please try again later.')
        }
    }

    const [data,setData]=useState([])

    
    useEffect(()=>{
        handlefetch()
    },[])  

    const handleDelete=async(id)=>{
        console.log('dddddddddddddd',id)
        try{
            const response=await Api.delete('deletedata/',{
               data: { id} 
            })
            console.log(response.data.res)
            toast.success(response.data.res)
            handlefetch()
        }catch(error){
            console.log(error.response?.data)
        }
    }

    const handlelogout=()=>{
        Cookie.remove('accesstoken')
        Cookie.remove('accesstoken')
        navigate('/')
        toast.success('Logout Successfully')
        
    }
 
    return (
        <div>
            <div className="min-h-screen flex flex-col ">
                <nav className=" px-5 py-9  flex justify-between">
                <img className="w-40" src="https://tailwebs.com/wp-content/uploads/2023/03/Group-222.png"/>
                <div className="grid  grid-cols-2 gap-15 font-medium mr-20">
                    <Link to={'/'}>Home</Link>
                    <button onClick={handlelogout} className="cursor-pointer">Logout</button>
                </div>
            </nav>
            <div className="bg-slate-200  h-screen flex flex-col  ">
               <dl className=" grid grid-cols-1 text-center  bg-white max-w-7xl  mt-5 mx-20 space-y-5  space-x-5 ">
                <div className="grid grid-cols-4 text-center text-gray-400 font-bold px-3 py-4 w-full">
                     <dt className="border-r-2 border-gray-200 border-b-2 py-3 ">Name</dt>
                <dt className="border-r-2 border-gray-200 border-b-2 py-3 ">Subject</dt>
                <dt className="border-r-2 border-gray-200 border-b-2  py-3">Marks</dt>
                <dt className=" border-gray-200 border-b-2 py-3 ">Action</dt>
                  </div>

                  {data.map((item,index)=>(
                             <div key={index} className="grid grid-cols-4 mb-5 text-center border-gray-300 py-3 text-gray-700 font-medium border-p-2 border-b-2 w-full">
                     <dd>{item.name}</dd>
                <dd >{item.subject}</dd>
                <dd >{item.marks}</dd>
                
                <dd  className="relative group "><img  className="ml-28 cursor-pointer h-5 w-5" 
                src="https://img.icons8.com/ios-filled/50/circled-chevron-down.png" alt="circled-chevron-down"/>
                
                <div> 
                  <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md p-2 border border-gray-300 px-5 py-1 z-10 ml-5 mt-">
    <button onClick={()=>{
        setCurrentId(item.id)
        setFormData({
            username:item.name,
            subject:item.subject,
            marks:item.marks
        })
        setUpdateModel(true)
    }}  className="block w-full text-left text-sm hover:bg-gray-100 px-2 cursor-pointer py-1">Edit</button>
    <button onClick={()=>handleDelete(item.id)}  className="block w-full text-left text-sm hover:bg-gray-100 px-2 cursor-pointer py-1 text-red-600">Delete</button>
  </div>
                               
                </div>
                </dd>
                    
                    </div>   
                             

                  )
                    
                  )}
       
               
               </dl>
               <div className="flex jusitfy-start  ml-20 mt-10 font-medium  text-white">
                <button onClick={()=>setIsModal(true)} className="bg-black hover:bg-slate-900 cursor-pointer px-15 py-2">Add</button>
            </div>   
            </div>
            

            </div>

            {ismodal && (
                <div className="fixed inset-0 z-50 bg-black/70  flex items-center justify-center">
                    <div className="bg-white p-5 rounded-lg shadow-lg  w-full max-w-md relative">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Name</label>
                                 <input  value={formData.username} onChange={handleChange} className="w-full border border-gray-400 p-2" name="username"  placeholder="Enter Name : Eg: Hari" />
               
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Subject</label>
                                 <input value={formData.subject} onChange={handleChange} className="w-full border border-gray-400 p-2" name="subject"  placeholder="Enter Subject : Eg: Python" />
               
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Marks</label>
                                 <input value={formData.marks} onChange={handleChange} className="w-full border border-gray-400 p-2" name="marks"  placeholder="Enter Marks : Eg:100" />
               
                            </div>
                            <div>
                                <button onClick={()=>setIsModal(false)} className="bg-red-500 px-8 py-2 mt-2 text-white font-medium cursor-pointer hover:bg-red-400">Cancel</button>
                                <button type="submit" className="bg-green-500 px-12    ml-40 py-2 font-medium text-white cursor-pointer hover:bg-green-400">Add</button>


                            </div>
                            
                        </form>

                        </div>
                </div>
            )}


            {updatemodal && (
                <div className="fixed inset-0 z-50 bg-black/70  flex items-center justify-center">
                    <div className="bg-white p-5 rounded-lg shadow-lg  w-full max-w-md relative">
                        <form onSubmit={handleupdate}>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Name</label>
                                 <input  value={formData.username} onChange={handleChange} className="w-full border border-gray-400 p-2" name="username"  placeholder="Enter Name : Eg: Hari" />
               
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Subject</label>
                                 <input value={formData.subject} onChange={handleChange} className="w-full border border-gray-400 p-2" name="subject"  placeholder="Enter Subject : Eg: Python" />
               
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Marks</label>
                                 <input value={formData.marks} onChange={handleChange} className="w-full border border-gray-400 p-2" name="marks"  placeholder="Enter Marks : Eg:100" />
               
                            </div>
                            <div>
                                <button onClick={()=>setUpdateModel(false)} className="bg-red-500 px-8 py-2 mt-2 text-white font-medium cursor-pointer hover:bg-red-400">Cancel</button>
                                <button type="submit" className="bg-green-500 px-10 ml-40 py-2 font-medium text-white cursor-pointer hover:bg-green-400">Update</button>


                            </div>
                            
                        </form>

                        </div>
                </div>
            )}
            

        </div>
    )
}
export default Dashboard;

