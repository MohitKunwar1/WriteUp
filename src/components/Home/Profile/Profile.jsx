import React, { useState } from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import ProfilePosts from "./Activities/ProfilePosts";
import AboutUser from "./Activities/AboutUser";
import EditProfile from "./EditProfile";
import { Blog } from "../../../Context/Context";
import { useParams } from "react-router-dom";
import ProfileList from "./Activities/ProfileList";
const Profile = () => {
  const { allUsers } = Blog();
  const { userId } = useParams();
  const activities = [
    {
      title: "Posts",
      comp: ProfilePosts,
    },
    {
      title: "List",
      comp: ProfileList,
    },
    {
      title: "About",
      comp: AboutUser,
    },
  ];
  const [editModal, setEditModal] = useState(false);
  const [currentActive, setCurrentActive] = useState(activities[0]);

  const getUserData = allUsers.find((user) => user.id === userId);

  return (
    <section className="w-[33rem] md:w-[73rem] lg:w-full p-3 sm:p-10 flex flex-col gap-10">
        <img src={getUserData?.coverImg || "/camera.png"} alt="coverimage"  className="w-full sm:w-[90%] h-[20rem] object-cover rounded-lg shadow-lg" />
      <div className="w-[80%] flex items-center justify-between">
        <div className="flex items-center gap-10 ">
            <img
              src={getUserData?.userImg || "/avatar.png"}
              alt="profile image"
              className="w-[5rem] h-[5rem] rounded-full object-cover"
            />
          <h2 className="text-4xl font-bold">{getUserData?.username}</h2>
        </div>
        <button
          onClick={() => setEditModal(true)}
          className="flex items-center gap-2 hover:text-gray-500 cursor-pointertext-xl hover:underline "
        >
          <LiaUserEditSolid className="text-3xl" />
          Edit Profile
        </button>
      </div>
      <div className="w-[80%] flex items-center gap-9 mt-[2rem] border-b-[1px] border-gray-300 mb-[1rem]">
        {activities.map((item, i) => (
          <div
            key={i}
            className={`py-[0.5rem] ${
              item.title === currentActive.title
                ? "border-b-[2px] border-gray-700 transition-all duration-200 "
                : ""
            }`}
          >
            <button
              onClick={() => setCurrentActive(item)}
              className="text-xl font-normal"
            >
              {item.title}
            </button>
          </div>
        ))}
      </div>
      <currentActive.comp
        getUserData={getUserData}
        setEditModal={setEditModal}
      />
      {editModal && (
        <EditProfile
          editModal={editModal}
          setEditModal={setEditModal}
          getUserData={getUserData}
        />
      )}
    </section>
  );
};

export default Profile;
