import React, { useEffect, useState } from "react";
import Modal from "../../../utils/Modal.jsx";
import { LiaTimesCircleSolid } from "react-icons/lia";
import { Blog } from "../../../Context/Context.jsx";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig.js";
import useSingleFetch from "../../hook/useSingleFetch.jsx";
import Loading from "../../Loading/Loading.jsx";
import Comment from "./Comment.jsx";

const Comments = ({ postId }) => {
 
  const { currentUser, allUsers, showComment, setShowComment, setCommentLength } = Blog();
  const [comments, setComments] = useState("");

  const getUserData = allUsers.find((user) => user.id === currentUser?.uid);
  const { data, loading } = useSingleFetch("posts", postId, "comments");

  const writeComment = async () => {
    try {
      if (comments === "") {
       return toast.error("The input field must be filled!");
      }
      const commentRef = collection(db, "posts", postId, "comments");

      await addDoc(commentRef, {
        commentText: comments,
        createdAt: Date.now(),
        userId: currentUser?.uid,
      });
      toast.success("Comment has been added.");
      setComments("");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if(data){
      setCommentLength(data.length)
    }
  }, [data]);
  return (
    <Modal setModal={setShowComment} modal={showComment}>
      <section
        className={`fixed top-0 right-0 bottom-0 z-50 bg-white w-[22rem] shadow p-5 overflow-y-auto transition-all duration-150 ${
          showComment ? "translate-x-0" : "translate-x-[23rem]"
        }`}
      >
        <div className="flex items-center justify-between ">
          <h3 className="text-xl font-bold ">Responses({data.length})</h3>
          <button onClick={() => setShowComment(false)} className="text-xl">
            <LiaTimesCircleSolid />
          </button>
        </div>

        {currentUser && (
          <div className="shadow p-3 my-5 overflow-hidden">
            <div className="flex items-center gap-2 mb-5 ">
              <img
                src={getUserData?.userImg || "/avatar.png"}
                alt="userimage"
                className="w-[2rem] h-[2rem] object-cover rounded-full"
              />
              <h3 className="text-sm capitalize font-bold">
                {getUserData?.username}
              </h3>
            </div>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="What are your thoughts?"
              className="w-full outline-none resize-none text-sm border-2 px-2 pt-4"
            ></textarea>
            <div className=" flex items-center justify-end gap-4 mt-[1rem]">
              <button onClick={() => setComments("")} className="text-sm">
                Cancel
              </button>
              <button
                onClick={writeComment}
                className="px-3 py-2 text-xs bg-emerald-700 rounded-full text-white"
              >
                Response
              </button>
            </div>
          </div>
        )}
        {
          data && data.length === 0 ? <p>This post has no comment.</p> : 
          <div className="border-t py-4 mt-8 flex flex-col gap-8">
          {data &&
            data.map((item, i) =>
              loading ? (
                <Loading />
              ) : (
                <Comment item={item} postId={postId} key={i} />
              )
            )}
        </div>
        }
      </section>
    </Modal>
  );
};

export default Comments;
