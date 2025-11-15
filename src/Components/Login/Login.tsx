import { ChangeEvent, FormEvent, useContext, useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../common/CustomInput";
import { AuthContext } from "../../context/AuthProvider";

export default function Login() {
  const navigate = useNavigate();
  const authContext =useContext(AuthContext);
   
  const [formData, setFormData]= useState({
    email:'noida@gmail.com',
    password:'noida@gmail.com',
  });
   if(!authContext){ console.log("Not getting !auth");}
   const { loginData }  = authContext;

  const handleChange =(e:ChangeEvent<HTMLInputElement>)=>
  {
    setFormData({...formData, [e.target.name]:e.target.value})     
  }

  const handleSubmit = async(e: FormEvent<HTMLFormElement>)=>{
   e.preventDefault();
    try {
      //console.log(formData);
      const response: any = await loginData(formData);
      if(response?.status ==="sucess"){
        navigate('/dashboard');
        localStorage.setItem('accessToken', response?.jwtToken);
      }
    } catch (error) {
      console.log(error);      
    }


  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-sm w-full">
          <h5 className="text-3xl font-bold text-center text-gray-900 mb-6">Login</h5>

          <form onSubmit={handleSubmit}>
                <CustomInput label="Email" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <CustomInput label="Password" name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
     
  </div>
</div>
</>
  );
}
