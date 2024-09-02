import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosMenu } from "react-icons/io";
import { Blog } from "../../Context/Context";
import { Link } from "react-router-dom";
import Auth from "./Auth/Auth";

const HamburgerMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [createUser, setCreateUser] = useState("");
  const { authModal, setAuthModal } = Blog();

  return (
    <>
      <div className="hambergerMenu block sm:hidden relative ">
        {showMenu ? (
          <AiOutlineClose
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-3xl"
          />
        ) : (
          <IoIosMenu
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-3xl"
          />
        )}
      </div>
      {showMenu && (
        <div className=" absolute  right-0 top-16 flex flex-col items-center gap-3 p-5 bg-black/70 ">
          <Link to="/">
            <button onClick={() => setShowMenu(false)} className="text-xl font-semibold text-gray-300 ">
              Home
            </button>
          </Link>
          <Link to="/about">
            <button onClick={() => setShowMenu(false)}  className="text-xl font-semibold text-gray-300 ">
              About us
            </button>
          </Link>
          <button
            onClick={() => {
              setAuthModal(true), setCreateUser("signUp")
            }}
            className="text-xl font-semibold text-gray-300 "
          >
            Sign Up
          </button>
          <button
            onClick={() => {
              setAuthModal(true), setCreateUser("")
            }}
            className="text-xl font-semibold text-gray-300 "
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
      )}
    </>
  );
};

export default HamburgerMenu;
