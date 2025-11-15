import React from 'react'
import { NavLink, Outlet } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';
export default function Layout() {
  return (
   <>
          <Header/>
            <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
              <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Outlet />
              </div>
            </div>
          <Footer/>
   </>
  )
}
