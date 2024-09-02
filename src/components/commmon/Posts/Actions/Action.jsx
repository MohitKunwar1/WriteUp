import React, { useState } from "react";
import { IoMdMore } from "react-icons/io";
import DropDown from "../../../../utils/DropDown";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../lib/firebaseConfig";
import toast from "react-hot-toast";
import { Blog } from "../../../../Context/Context";

const Action = ({postId, title, desc}) => {
  const { setUpdateData, currentUser } = Blog();
    const [showDrop, setShowDrop] = useState(false);
    const navigate = useNavigate(null);

    const handleClick = () => {
        setShowDrop(!showDrop)
    }

    const handleEdit = () => {
      navigate(`/editpost/${postId}`) ;
      setUpdateData({title, description: desc});
    }

    const handleRemove = async () => {
      try {
        const ref = doc(db, "posts", postId);
        const likeRef = doc(db, "posts", postId, "likes", currentUser?.uid);
        const commentRef = doc(db, "posts", postId, "comments", currentUser?.uid);
        const savedPostRef = doc(
          db,
          "users",
          currentUser?.uid,
          "savedPost",
          postId
        );
        await deleteDoc(ref);
        await deleteDoc(likeRef);
        await deleteDoc(commentRef);
        await deleteDoc(savedPostRef);
  
        toast.success("Post has been removed");
        setShowDrop(false);
        navigate("/");
      } catch (error) {
        toast.success(error.message);
      }
    };
  
  return (
    <div className="relative">
      <button onClick={handleClick} className="text-2xl text-gray-500">
        <IoMdMore />
      </button>
      <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[7rem]">
        <Button click={handleEdit} title="Edit Story" />
        <Button click={handleRemove} title="Delete Story" />
      </DropDown>
    </div>
  );
};

export default Action;

const Button = ({ click, title }) => {
  return (
    <>
      <button
      onClick={click}
        className={`p-2 hover:bg-gray-100 hover:text-black/80 w-full text-sm text-left 
        ${title === "Delete Story" ? "text-red-600" : ""}`}
      >
        {title}
      </button>
    </>
  );
};
