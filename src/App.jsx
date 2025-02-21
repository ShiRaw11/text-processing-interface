import React from "react";
import NavbarText from "./Navbar_Text";
import { useNavigate } from "react-router-dom";

export default function App(){

  const navigate = useNavigate();

  const goTochat= ()=>{
    navigate('/chat')
  }
  return (
    <div className="flex flex-col  max-w-full mx-auto p-2 shadow-xl bg-pink-100 min-h-screen">
      <NavbarText />
      <div className="text-center p-6">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          🚀 Transform Your Text with AI-Powered Magic!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mt-4">
          ✅ Instantly detect languages like a pro
        </p>
        <p className="text-lg md:text-xl text-gray-700 mt-4">
          ✅ Translate effortlessly into multiple languages 🌍
        </p>
        <p className="text-lg md:text-xl text-gray-700 mt-4">
          ✅ Summarize long content in seconds ⏳
        </p>


        <div className="mt-6 p-5 bg-gradient-to-r from-blue-100 to-blue-200 text-gray-900 rounded-xl border border-blue-300 shadow-md animate-fade-in">
          <p className="text-lg font-medium">
            🎉 The process is super simple!
          </p>
          <p className="mt-2 text-gray-800">
            ✍️ Just enter your text, choose a language, and hit
            <span className="font-semibold text-green-600"> "Translate" </span>—it's that easy!
          </p>
          <p className="mt-2 text-gray-800">
            🧾 If you want to summarise, make sure your text has more than 150 characters to access the feature!
            
          </p>
        </div>

        <button className="mt-6 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition transform hover:scale-105" onClick={goTochat}>
          Continue to Text Processing interface
        </button>
      </div>
      </div>

    )}