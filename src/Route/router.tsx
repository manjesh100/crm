import {createBrowserRouter } from "react-router-dom";
import Login from "../Components/Login/Login";
import Home from "../Components/Home/Home";
import Layout from "../Components/Layout/Layout";
import AddList from '../Components/Notest/AddList';
import List from "../Components/Notest/List";
import ListAdvance from "../Components/Notest/ListAdvance";
import WithAuthenticate from "../Components/HOC/WithAuthenticate";
 

const HomeComponents = WithAuthenticate(Home); 
const AddListComponents = WithAuthenticate(AddList);
const ListComponents =WithAuthenticate(List);
const AdvanceList =WithAuthenticate(ListAdvance);

export const router = createBrowserRouter([
{
  path: '/',
  element:<Layout/>,
  children:[
    {
       index: true,
       element:<Login/>
    },
    {
        path: 'dashboard',
        element:<HomeComponents/>   
    },
    {
        path:'add-note',
        element:<AddListComponents/>

    },
    {
        path:'note-list',
        element:<ListComponents/>
    },
    {
      path:'advanmce-note-list',
      element:<AdvanceList/>


    }
  ]


}])
