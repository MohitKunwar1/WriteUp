import React from "react";
import useSingleFetch from "../../../hook/useSingleFetch";
import { Blog } from "../../../../Context/Context";
import Loading from "../../../Loading/Loading";
import PostCard from "../../../commmon/Posts/PostCard";
import { CiLock } from "react-icons/ci";

const ProfileList = ({ getUserData }) => {
  const { currentUser } = Blog();
  const { data, loading } = useSingleFetch(
    "users",
    currentUser?.uid,
    "savedPost"
  );
  return (
    <div>
      {currentUser && currentUser?.uid === getUserData?.userId ? (
        <div className="flex flex-col gap-[2rem] mb-[2rem]">
          {data && data.length === 0 && (
            <p className="text-gray-500 ">
              <span className="capitalize mr-1 font-bold">
                {getUserData?.username}
              </span>{" "}
              has no saved posts.
            </p>
          )}
          {loading ? (
            <Loading />
          ) : (
            data?.map((post, i) => <PostCard post={post} key={i} />)
          )}
        </div>
      ) : (
        <PrivateList username={getUserData?.username} />
      )}
    </div>
  );
};

export default ProfileList;

const PrivateList = ({ username }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-[3rem] text-center">
      <p>
        <span className="capitalize font-bold ">{username}</span> saved posts
        are private.
      </p>
      <span className="text-[12rem] text-gray-400 ">
        <CiLock />
      </span>
    </div>
  );
};
