import React from "react";
import { readTime } from "../../../utils/helper";
import moment from "moment/moment";
import SavedPost from "./Actions/SavedPost";
import { Blog } from "../../../Context/Context";
import Action from "./Actions/Action";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const {
    title,
    desc,
    createdAt,
    postImg,
    id: postId,
    userId,
    username,
  } = post;
  const { currentUser } = Blog();
  const navigate = useNavigate();

  return (
    <section className="border-b-2 sm:border-0">
      <div
        onClick={() => navigate(`/post/${postId}`)}
        className="flex flex-col  sm:flex-row gap-4 cursor-pointer "
      >
        <div className="flex-[2.5] ">
          <p className="pb-2 font-semibold capitalize text-xl ">{username}</p>
          <h2 className="text-xl font-bold line-clamp-2 leading-6 capitalize">
            {title}
          </h2>
          <div
            className="sm:py-1 text-gray-500 line-clamp-2 leading-5"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </div>
        {
          postImg &&
          <div className="flex-[1]">
          <img
            src={postImg}
            alt="postimg"
            className="w-[15rem] h-[10rem] object-cover"
          />
        </div>
        }
      </div>
      <div className="flex items-center justify-between w-full md:w-[70%] mt-[2rem] ">
        <p className="text-xs text-gray-600">
          {readTime({ __html: desc })} min read.
          {moment(createdAt).format("MMM DD")}
        </p>
        <div className="flex items-center gap-3">
          <SavedPost post={post} />
          {currentUser?.uid === userId && (
            <Action postId={postId} title={title} desc={desc} />
          )}
        </div>
      </div>
    </section>
  );
};

export default PostCard;
