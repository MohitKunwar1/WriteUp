import React, {  useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LiaEditSolid } from "react-icons/lia";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../../../utils/Modal";
import UserModal from "./UserModal";
import { Blog } from "../../../Context/Context";
import Loading from "../../Loading/Loading";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import Search from "./Search.jsx"
import { db } from "../../../lib/firebaseConfig.js";

const HomeHeader = () => {
  const { allUsers, userLoading, currentUser, setPublish, title, description } =
    Blog();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { pathname } = useLocation();
  const getUserData = allUsers?.find((user) => user.id === currentUser?.uid);

  const editPath = pathname.split("/")[1];
  const postId = pathname.split("/")[2];

  const navigate = useNavigate(null);

  const handleEdit = async () => {
    try {
      setLoading(true);
      const ref = doc(db, "posts", postId);
      await updateDoc(ref, {
        title,
        desc: description,
      });
      navigate(`/post/${postId}`);
      toast.success("Post has been updated");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="">
      {userLoading && <Loading />}
      <div className=" sm:px-20 px-2 w-[33rem] sm:w-[70rem] lg:w-full h-[70px] sm:h-[60px] flex sm:items-center justify-between border-b-[1px] border-black">
        {/* left side  */}
        <div className="flex items-center gap-10">
          <Link to={"/"}>
            <span className="text-4xl font-bold">WriteUp</span>
          </Link>
          <Search />
        </div>
        {/* middle side */}
        <div className="hidden sm:flex gap-16 text-2xl font-semibold ">
          <Link to="/" className="hover:underline transition-all duration-200">Home</Link>
          <Link to="/about" className="hover:underline transition-all duration-200">About</Link>
        </div>
        {/* right side  */}
        <div className="flex items-center gap-3 sm:gap-10">
          {pathname === "/write" ? (
            <button
              onClick={() => setPublish(true)}
              className="btn !bg-green-700 !px-3 !py-1 !text-white !rounded-full"
            >
              Publish
            </button>
          ) : editPath === "editpost" ? (
            <button
              onClick={handleEdit}
              className={`!px-5 !bg-green-600 !py-1 !text-white !rounded-full
              ${loading ? "opacity-40" : ""}
              `}
            >
              {loading ? "Updating..." : "Save and Update"}
            </button>
          ) : (
            <Link to="/write" className="hidden md:flex items-center gap-1">
              <span className="text-3xl">
                <LiaEditSolid />
              </span>
              <span className="text-xl mt-2 font-semibold">Write</span>
            </Link>
          )}
          <div className="flex items-center relative">
            <img
              onClick={() => setModal(true)}
              className="w-[2.3rem] h-[2.3rem] object-cover rounded-full cursor-pointer"
              src={getUserData?.userImg || "/avatar.png"}
              alt="profile-img"
            />
            <span className="text-white cursor-pointer">
              <MdKeyboardArrowDown />
            </span>
            <Modal modal={modal} setModal={setModal}>
              <div
                className={`${
                  modal ? "visible opacity-100%" : "invisible opacity-0"
                } transition-all duration-100`}
              >
                <UserModal setModal={setModal} />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
