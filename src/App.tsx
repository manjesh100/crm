import { AuthProvider } from './context/AuthProvider';
import { RouterProvider } from 'react-router-dom';
import useIdleLogout from './Components/HOC/useIdleTimer'
import './App.css'
import { router } from './Route/router'
function App() {
  useIdleLogout();
  return (
    <>
     <AuthProvider>
       <RouterProvider router={router}/>
       </AuthProvider>
    </>
  )
}


export default App
