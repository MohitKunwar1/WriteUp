import React from "react";
import { Blog } from "../../../../Context/Context";

const AboutUser = ({ getUserData, setEditModal }) => {
  const {currentUser} = Blog()
  return (
    <div className="w-[80%]">
      <p className="text-2xl first-letter:uppercase">
        {getUserData?.bio || getUserData?.username + " Has no bio!"}
      </p>
      <div className="text-right">
        {
          currentUser && <button
          onClick={() => setEditModal(true)}
          className="border-black border-[1px] px-5 py-2 rounded-full text-xl text-black mt-[3rem]"
        >
          Edit
        </button>
        }
      </div>
    </div>
  );
};

export default AboutUser;
