import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Blog } from "../../../Context/Context";
import { auth } from "../../../lib/firebaseConfig";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { IoHomeOutline } from "react-icons/io5";
import { BsInfoSquare } from "react-icons/bs";

const UserModal = ({ setModal }) => {
  const { currentUser } = Blog();
  const navigate = useNavigate(null);

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/demo");
      toast.success("Loggedout Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  return (
    <section
      onClick={() => setModal(false)}
      className="absolute w-[10rem] flex flex-col gap-3 p-3 bg-white right-4 top-[100%] shadow rounded-md z-50 text-gray-500"
    >
      <Link to="/" >
      <span className="flex md:hidden items-center gap-2">
          <IoHomeOutline className="text-2xl" />
          <p className="text-xl font-normal">Home</p>
        </span>
      </Link>
          <Link to="/about">
          <span className="flex md:hidden items-center gap-2">
          <BsInfoSquare className="text-2xl" />
          <p className="text-xl font-normal">About</p>
        </span>
          </Link>
      <Link to="/write">
        <span className="flex md:hidden items-center gap-2">
          <FaRegEdit className="text-2xl" />
          <p className="text-xl font-normal">Write</p>
        </span>
      </Link>
      <Link to={`/profile/${currentUser?.uid}`}>
        <span className="flex items-center gap-2 hover:underline">
          <AiOutlineUser className="text-2xl" />
          <p className="text-xl font-normal">Profile</p>
        </span>
      </Link>
        <button
          onClick={logOut}
          className="flex items-center gap-2 hover:underline"
        >
          <MdLogout className="text-2xl" />
          <p className="text-xl font-normal">Logout</p>
        </button>
    </section>
  );
};

export default UserModal;
