import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from './assets/logo.png'
export default function NavbarText() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const goToredirect = () => {
    navigate("/redirect");
  };
  return (
    <nav className="bg-gray-900 text-white p-4 h-[90px] shadow-md flex justify-between items-center rounded-lg ">
      <div className="h-[50px] w-[50px] "><img className="rounded-full w-full h-full object-cover" src={logo} alt="logo"/></div>
      <div className="hidden md:flex gap-6 text-lg">
        <Link className="hover:text-pink-400" to={"/redirect"}>
          Home
        </Link>
        <Link className="hover:text-pink-400" to={"/redirect"}>
          Language Detector
        </Link>
        <Link className="hover:text-pink-400" to={"/redirect"}>
          Translator
        </Link>
        <Link className="hover:text-pink-400" to={"/redirect"}>
          Summarizer
        </Link>
      </div>
      <div className="hidden md:flex gap-4">
        <button className="px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-600">
          Sign Up
        </button>
        <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">
          Login
        </button>
      </div>

      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-[250px] bg-gray-900 rounded-lg shadow-lg transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 md:hidden`}
      >
        <div className="flex flex-col gap-6 p-5">
          <Link className="hover:text-pink-400" to={"/redirect"}>
            Home
          </Link>
          <Link className="hover:text-pink-400" to={"/redirect"}>
            Language Detector
          </Link>
          <Link className="hover:text-pink-400" to={"/redirect"}>
            Translator
          </Link>
          <Link className="hover:text-pink-400" to={"/redirect"}>
            Summarizer
          </Link>
          <button
            className="px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-600"
            onClick={goToredirect}
          >
            Sign Up
          </button>
          <button
            className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={goToredirect}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
