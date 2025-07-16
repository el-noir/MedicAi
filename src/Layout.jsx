import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function Layout(){
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