/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"


const WithAuthenticate = (WrappedComponent: any) => {
  
  const CheckAuthenticate = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const isLogin = localStorage.getItem('accessToken');
        if(isLogin === null){
            navigate("/");}
    }, [navigate]);
    return localStorage.getItem('accessToken') != null && <WrappedComponent />
  }
  return CheckAuthenticate;
}

export default WithAuthenticate; 
