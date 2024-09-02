import React, { useState, useEffect } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import { Blog } from "../../../../Context/Context.jsx";
import { db } from "../../../../lib/firebaseConfig";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import useSingleFetch from "../../../hook/useSingleFetch.jsx";

const SavedPost = ({ post }) => {
  const [isSaved, setIsSaved] = useState(false);
  const { currentUser, setAuthModal } = Blog();
  const { data } = useSingleFetch("users", currentUser?.uid, "savedPost");

  useEffect(() => {
    if (data) {
      setIsSaved(data && data.some((item) => item.id === post?.id));
    }
  
  }, [data, post?.id]);

  const handleSaved = async () => {
    try {
      if (currentUser) {
        const savedRef = doc(
          db,
          "users",
          currentUser?.uid,
          "savedPost",
          post?.id
        );

        if (isSaved) {
          await deleteDoc(savedRef);
          toast.success("Post has been unsaved!");
        } else {
          await setDoc(savedRef, {
            ...post,
          });
          toast.success("Post has been saved!");
        }
      } else {
        setAuthModal(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <button onClick={handleSaved} className={`hover:opacity-60`}>
        <CiSaveDown2
          className={`text-2xl pointer-events-none ${
            isSaved ? "text-yellow-600" : ""
          }`}
        />
      </button>
    </div>
  );
};

export default SavedPost;
