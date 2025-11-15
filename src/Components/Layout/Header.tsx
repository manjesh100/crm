import { useContext, useEffect,useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function Header() {
   
 const authContext =useContext(AuthContext);
 const {user} = authContext;  
 const [storedUser, setStoredUser] = useState(user);

 useEffect(() => {   
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    setStoredUser(JSON.parse(savedUser));
  }
}, [user]);

const  pageNavigate =useNavigate();
const handleLogout=()=>{    
  localStorage.removeItem("accessToken");  
  localStorage.removeItem("user");    
  pageNavigate("/"); 
 window.location.reload();
}
   //const userData =JSON.parse(localStorage.getItem("user"));      
    //console.log(user?.data?.userdata?.name);
  return (
    <header className="text-white p-4 w-full bg-gradient-to-r from-purple-500 to-pink-800 text-white py-4 shadow-md w-screen">
    <div className="container mx-auto flex justify-between items-center px-6">
      <h3 className="text-2xl font-bold">TO DO LIST</h3>
      <nav>
        <ul className="flex gap-x-6">
           {storedUser?(
            <>
          <li>
            <NavLink to="/dashboard" className="text-lg font-medium hover:text-gray-200">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-note" 
            className="text-lg font-medium hover:text-gray-200">
              Add Notes
            </NavLink>
          </li>
          <li>
            <NavLink to="/note-list" className="text-lg font-medium hover:text-gray-200">
              List Notes
            </NavLink>
          </li>

           <li>
            <NavLink to="/advanmce-note-list" className="text-lg font-medium hover:text-gray-200">
             Advance table List
            </NavLink>
          </li>

          </>
           ):null}          
          {!storedUser ? (
              <li>
                <NavLink to="/" className="text-lg font-medium hover:text-gray-200">
                  Login
                </NavLink>
              </li>
            ) : (
              <li className="text-lg font-medium text-blue-700 hover:text-gray-200">
                WELCOME: {storedUser?.userdata?.name}{" "}
                <button onClick={handleLogout} className="ml-2 text-red-500">
                  Logout
                </button>
              </li>
            )}
        </ul>
      </nav>
    </div>
  </header>  
  );
}
