import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-200">
      <nav className="flex items-center bg-gray-200 py-4 px-6 justify-between sticky top-0 border-b-2 border-black shadow-md">
        <div className="flex items-center ">
          <Link
            to="/"
            className="flex items-center text-xl md:text-2xl lg:text-4xl font-serif text-black gap-4 no-underline ml-16"
          >
            <img
              src="blackTransparent.png"
              alt="search"
              className="h-24 w-24 mr-4"
            />
            SYNCONET
          </Link>
        </div>
        <ul className="flex list-none space-x-4 md:space-x-6 lg:space-x-8 text-xs md:text-sm lg:text-xl font-medium ">
          <li>
            <NavLink
              to="/Login"
              className="no-underline bg-black text-white py-2 px-3 md:px-4 rounded-[15px] hover:bg-slate-600 transition "
            >
              Log In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Register"
              className="no-underline bg-black text-white py-2 px-3 md:px-4 rounded-[15px] hover:bg-slate-600 transition mr-10"
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="flex-grow flex flex-col justify-center items-center text-center px-4 lg:px-0 ">
        <h2 className="text-xl md:text-3xl lg:text-5xl font-sans text-black leading-normal">
          All-in-One Platform
          <br />
          for <span className="font-sans m-1 md:m-3">Meetings,</span>
          <span className="font-sans">Chats</span>,
          <br />
          and <span className="font-sans">Networking</span>
        </h2>
        <p className="mt-6 md:mt-8 lg:mt-10 text-gray-400 text-sm md:text-lg lg:text-2xl font-thin">
          Your Gateway to Professional Online Meetings. Along with additional
          <br />
          <span>features.</span>
        </p>
        <div className="flex flex-wrap justify-center mt-6 md:mt-8 lg:mt-10 gap-x-20">
          {/* <button className="h-10 px-6 md:px-8 bg-black text-white rounded-[15px] hover:bg-gray-600 transition m-2 cursor-pointer">
            Get Started
          </button>
          <button
            className="h-10 px-6 md:px-8 bg-white text-black border border-black rounded-[15px] hover:bg-slate-300 transition m-2 cursor-pointer">
            Try Example
          </button> */}
          <img src="network.png" alt="networking" className="h-60 w-50" />
          <img src="net.png" alt="netowrking" className="h-60 w-70" />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
