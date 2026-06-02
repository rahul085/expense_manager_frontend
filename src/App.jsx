import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Footer from "./component/Footer";
const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  );
};

export default App;
