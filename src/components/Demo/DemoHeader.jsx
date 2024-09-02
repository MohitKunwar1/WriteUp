import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth/Auth";
import { Blog } from "../../Context/Context";
import HamburgerMenu from "./HamburgerMenu";

const DemoHeader = () => {
  const [createUser, setCreateUser] = useState("");
  const [isActive, setIsActive] = useState(false);
  const { authModal, setAuthModal } = Blog();


  useEffect(() => {
    const scrollMe = () => {
      window.scrollY > 50 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener("scroll", scrollMe);
  }, []);

  return (
    <header
      className={`w-[33rem] sm:w-full h-16 border-b border-black  sticky top-0 z-50 flex justify-between items-center px-3 sm:px-0 ${
        isActive ? "bg-white" : "bg-emerald-700"
      } transition-all duration-500`}
    >
      <div className="flex-1  flex sm:justify-center">
        <Link to="/">
          <h1 className=" sm:text-4xl text-3xl font-bold sm:font-semibold">
            WriteUp
          </h1>
        </Link>
      </div>
      <ul className="sm:flex hidden flex-[2] justify-center  gap-16 cursor-pointer ">
        <Link to="/">
          <li className="sm:text-xl text-lg font-medium hover:underline duration-150">Home</li>
        </Link>
        <Link to="/about">
          <li className="sm:text-xl text-lg font-medium hover:underline duration-150">About us</li>
        </Link>
      </ul>
      <div className=" relative  flex-1 sm:flex hidden items-center justify-center gap-10  ">
        <button
          onClick={() => {
            setAuthModal(true), setCreateUser("signUp");
          }}
          className="text-sm font-medium text-white bg-emerald-500 px-5 py-2 rounded-full hover:bg-white hover:text-black  duration-200"
        >
          Sign Up
        </button>
        <button
          onClick={() => {
            setAuthModal(true), setCreateUser("");
          }}
          className="text-sm font-medium text-white bg-black px-5 py-2 rounded-full hover:bg-white hover:text-black  duration-200"
        >
          Log In
        </button>
        <Auth
          modal={authModal}
          setModal={setAuthModal}
          createUser={createUser}
          setCreateUser={setCreateUser}
        />
      </div>
      <HamburgerMenu />
    </header>
  );
};

export default DemoHeader;
