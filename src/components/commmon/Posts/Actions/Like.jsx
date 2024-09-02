import React, { useEffect, useState } from "react";
import { PiHandsClappingDuotone } from "react-icons/pi";
import {Blog} from "../../../../Context/Context.jsx";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebaseConfig.js";
import useFetch from "../../../hook/useFetch.jsx";
import useSingleFetch from "../../../hook/useSingleFetch.jsx";
import { formatNumber } from "../../../../utils/helper.js";
const Like = ({ postId }) => {
  const { currentUser, setAuthModal } = Blog();
  const [isLiked, setIsLiked] = useState(false);

  const {data} = useSingleFetch("posts", postId, "likes");

  useEffect(() => {
    setIsLiked(data && data.findIndex((item) => item.id === currentUser?.uid)!== -1) ;

  }, [data])
  const handleLike = async () => {
    try {
      if (currentUser) {
        const likeRef = doc(db, "posts", postId, "likes", currentUser?.uid);
        if (isLiked) {
          await deleteDoc(likeRef);
        } else {
          await setDoc(likeRef, {
            userId: currentUser?.uid,
          });
        }
      }else{
        setAuthModal(true)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button onClick={handleLike} className="flex items-center gap-1 text-sm">
      <PiHandsClappingDuotone className={`text-xl ${isLiked ? "text-black" : "text-gray-500"}`} />
      <span>{formatNumber(data?.length)}</span>
    </button>
  );
};

export default Like;
