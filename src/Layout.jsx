import React,{useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getCurrentUser } from "./store/slices/authSlice"

function Layout(){
    const dispatch = useDispatch()

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem("accessToken")
    if (token) {
      dispatch(getCurrentUser())
    }
  }, [dispatch])
return(
    <>
 <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* This will render either Home or Predict component */}
      </main>
      <Footer />
    </div>
    </>

);
}

export default Layout