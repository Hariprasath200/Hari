import axios from 'axios';
import Cookie from 'js-cookie'


const Api=axios.create({
    baseURL:'http://127.0.0.1:8000/backend/api/',
    withCredentials:true,
})

Api.interceptors.request.use((con)=>{
    const accesstoken=Cookie.get('accesstoken')
    if (accesstoken){
        con.headers['Authorization']=`Bearer ${accesstoken}`
    }
    const csrftoken=Cookie.get('csrftoken')
    if (csrftoken){
        con.headers['X-CSRFToken']=csrftoken
    }
    return con;
},(error)=>{
    return Promise.reject(error)
})  

export default Api;