import React from "react";
import Loading from "../../../Loading/Loading";
import PostCard from "../../../commmon/Posts/PostCard";
import { Blog } from "../../../../Context/Context";

const ProfilePosts = ({ getUserData }) => {
  const { postData, postLoading } = Blog()
  const userPosts =
    postData && postData?.filter((post) => post?.userId === getUserData?.userId);
  return (
    <div className="flex flex-col gap5 mb-[4rem]">
      {userPosts.length === 0 && (
        <p className="text-gray-500">
          <span className="capitalize font-bold"> {getUserData?.username} </span>
          has no post.
        </p>
      )}
      {
        postLoading ? <Loading /> : userPosts && userPosts?.map((post, i) => (
          <PostCard post={post} key={i} /> 
        ))
      }
    </div>
  );
};

export default ProfilePosts;
