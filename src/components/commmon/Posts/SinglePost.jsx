import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../lib/firebaseConfig";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import Loading from "../../Loading/Loading";
import { readTime } from "../../../utils/helper";
import moment from "moment/moment";
import SavedPost from "./Actions/SavedPost";
import Action from "./Actions/Action";
import Like from "./Actions/Like";
import SharePost from "./Actions/SharePost";
import Comment from "../../../components/commmon/Posts/Actions/Comment.jsx";
import { Blog } from "../../../Context/Context";
import Comments from "../Comment/Comments.jsx";

const SinglePost = () => {
  const { currentUser } = Blog();
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //for trending post increment page views
  const isInitalRender = useRef(true);
  useEffect(() => {
    if (isInitalRender?.current) {
      const incrementPageView = async () => {
        try {
          const ref = doc(db, "posts", postId);
          await updateDoc(
            ref,
            {
              pagrViews: increment(1),
            },
            {
              merger: true,
            }
          );
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        }
      };
      incrementPageView();
    }
    isInitalRender.current = false;
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const postRef = doc(db, "posts", postId);
        const getPost = await getDoc(postRef);

        if (getPost.exists()) {
          const postData = getPost.data();
          if (postData?.userId) {
            const userRef = doc(db, "users", postData?.userId);
            const getUser = await getDoc(userRef);

            if (getUser.exists()) {
              const { createdAt, ...rest } = getUser.data();
              setPost({ ...postData, ...rest, id: postId });
            }
          }
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(error.meassge);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, post?.userId]);

  const { title, desc, postImg, username, createdAt, userImg, userId } = post;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <section className="w-[33rem] p-3 md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
            <h2 className="text-4xl font-extrabold capetilize">{title}</h2>
            <div className="flex items-center gap-2 py-[2rem]">
              <img
                src={userImg}
                alt="userImg"
                onClick={() => navigate(`/profile/${userId}`)}
                className="w-[3rem] h-[3rem] object-cover rounded-full cursor-pointer"
              />
              <div>
                <span className="capitalize">{username}</span>
                <p className="text-sm text-gray-500">
                  {readTime({ __html: desc })} min read.
                  <span className="ml-1">{moment(createdAt).fromNow()}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between border-y-[1px]  border-gray-200 py-[0.5rem]">
              <div className="flex items-center gap-5">
                <Like postId={postId} />
                <Comment />
              </div>
              <div className="flex items-center justify-center gap-5">
                {post && <SavedPost post={post} />}
                <SharePost />
                {currentUser && currentUser?.uid === post?.userId && <Action postId={postId} title={title} desc={desc} />}
              </div>
            </div>
            <div className="mt-[3rem] ">
              {postImg && (
                <img
                  src={postImg}
                  alt="PostImage"
                  className="w-full h-[400px] object-cover"
                />
              )}
              <div
                className="mt-6"
                dangerouslySetInnerHTML={{ __html: desc }}
              />
            </div>
          </section>
          <Comments postId={postId} />
        </>
      )}
    </>
  );
};

export default SinglePost;
