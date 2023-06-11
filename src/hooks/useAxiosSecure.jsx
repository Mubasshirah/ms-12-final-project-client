import { useContext } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
// axiosSecure ta useAxiosSecure hook er bairwe call korte hobe,noeto vitore call korle payment e gia jokhon useEffect e axiosSecure ke dependency hisebe dia hobe tokhon backend ebar bar call hoite thakbe hook tar jnno and error dekhabe
const axiosSecure=axios.create({
    baseURL: 'http://localhost:5000',
}); 
const useAxiosSecure=()=>{
    const {logOut}=useContext(AuthContext);
    const navigate=useNavigate();
    
    useEffect(()=>{
        axiosSecure.interceptors.request.use((config)=>{
            const token=localStorage.getItem('access-token');
            if(token){
                config.headers.Authorization=`Bearer ${token}`
            }
            return config;
        });
        axiosSecure.interceptors.response.use(
            (response)=>response,
            async (error)=>{
               if(error.response && (error.response.status === 401 || error.response.status===403)){
                await logOut();
                navigate('/login');
               } 
               return Promise.reject(error);
            }
        );
    },[logOut,navigate]);
    return [axiosSecure];
};
export default useAxiosSecure;