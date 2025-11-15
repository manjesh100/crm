 /* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { createContext, useState,useEffect, ReactNode, FC } from 'react';
import { data } from 'react-router-dom';
 // Define the shape of the AuthContext
export interface IAuthContextType {
    user: User | null;
    login: (user: User) => void;
    addNote: (addNote: IAddNote) => void;
    getAllNotes: () => void;
    deleteNote:(deleteNote: IdleDeleateLine)=> void;
    editNote:(editNote:any)=> void;
}
// Define the shape of a user object
interface User {
    email: string;
    password: string;
}
interface ILoginCredentials
{
    email: string;
    password: string;
} 
interface IAddNote 
{
  title: string,
  description: string,
  tag:string
}
interface IdleDeleateLine { _id:string }

// Create the AuthContext with the defined type
const AuthContext = createContext<IAuthContextType | null>(null);
interface AuthProviderProps { children: ReactNode;}
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
     const baseUrl= 'http://localhost:8000';
    const loginData = async (payload: ILoginCredentials) => {        
        try {
            const response = await axios.post(`${baseUrl}/user/login`, payload);               
            //const response = await axios.post('https://0a40-27-6-246-189.ngrok-free.app/user/login', payload);
            setUser(response);          
            if(response){                 
            localStorage.setItem("user", JSON.stringify(response.data));  
            //const userDataLocal =JSON.parse(localStorage.getItem("user"));
            //console.log(userDataLocal, "dddddddddd");
           // getUserProfile({ email: userDataLocal.userdata.email });  
            }    
            //console.log(response?.data);          
            return response?.data;
        } catch(error) {
            console.log('Login failed', error);
        }
    };

    const addNote = async (payload: IAddNote)=> {
        try {
        const addResponce = await axios.post(`${baseUrl}/note/add-notbook`, payload);
        return addResponce?.data;
        }catch(error){
              if(axios.isAxiosError(error))
              {
                  console.log(error.response?.data);
              }else{
                return error;
              }
             }       
    }; 

    // const getUserProfile = async (payload: Iprofile)=>{
         
    //     try {
    //         const responceProfileList = await axios.post(`${baseUrl}/user/profile`, payload,  {
    //             headers: {
    //               "Content-Type": "application/json",
    //             },
    //           });  
                                  
    //         return responceProfileList?.data;    
            
    //     }catch(error){
    //         if(axios.isAxiosError(error))
    //             {
    //               console.log(error);
    //             }else{
    //                 console.log(error);
    //             }
            
    //     }
    // }

const getAllNotes = async ()=>{
    try {
        const responceList= await axios.get(`${baseUrl}/note/notbook-list`,{
            headers: {
                'ngrok-skip-browser-warning': 'true', 
                'Content-Type': 'application/json', 
              },
             // withCredentials: true, // Ensures cookies/session are included
              mode: 'cors', // Helps with cross-origin requests
        });
         
        return responceList?.data;
        
    }catch(error){
        console.log(error);
        if(axios.isAxiosError(error))
            {
              console.error(error.response?.data);
            }else{
                console.log(error);
            }
        
    }
}

const deleteNote =async(payload: IdleDeleateLine)=>{
    try {  
         const response = await axios.delete(`${baseUrl}/note/notbook-delete`,{data:payload});
         return response?.data;
        
    }catch(error){
        if(axios.isAxiosError(error))
        {
            console.log(error.response?.data);
        }else{
            console.log(error);
        }        
    }
}

const updateNote = async(payload: IAddNote)=>{
    try {
         const responce =await axios.patch(`${baseUrl}/note/notbook-update`,payload);
         return responce?.data;  
    }catch(error) {
        if(axios.isAxiosError(error))
            { console.error('Error Response:', error.response?.data);
            }else{ console.log(error); }
    }
}

const notbookCountCategories = async()=>{
    try {
        const responceListCount= await axios.get(`${baseUrl}/note/notbook-count-categories`,{
            headers: {
                'ngrok-skip-browser-warning': 'true', 
                'Content-Type': 'application/json', 
              },            
                 // withCredentials: true, // Ensures cookies/session are included
              mode: 'cors', // Helps with cross-origin requests 
        });
         
         return responceListCount?.data;
    }catch(error){
        if(axios.isAxiosError(error))
            {
              console.error(error.response?.data);
            }else{
                console.log(error);
            }
        }
    }
    

useEffect(() => {
    const storedUser = localStorage.getItem("user"); 
    if (storedUser) { 
      setUser(JSON.parse(storedUser)); // Restore user from localStorage
    }
  }, []);
    return (
        <AuthContext.Provider value={{user, loginData, addNote,getAllNotes,deleteNote,updateNote,notbookCountCategories}}>
            {children}
        </AuthContext.Provider>
    );
};
export { AuthContext, AuthProvider };
