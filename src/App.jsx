import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DemoHeader from "./components/Demo/DemoHeader";
import Demo from "./components/Demo/Demo";
import Home from "./components/Home/Home";
import HomeHeader from "./components/Home/Header/HomeHeader.jsx";
import Notification from "./lib/notification/Notification.jsx";
import { Blog } from "./Context/Context.jsx";
import Profile from "./components/Home/Profile/Profile.jsx";
import Write from "./components/Home/Write/Write.jsx";
import SinglePost from "./components/commmon/Posts/SinglePost.jsx";
import EditPost from "./components/commmon/Posts/Actions/EditPost.jsx";
import About from "./components/commmon/About.jsx";

const App = () => {
  const { currentUser } = Blog();
  return (
    <>
      {currentUser ? <HomeHeader /> : <DemoHeader />}
      <Notification />
      <Routes>
        {currentUser && <Route path="/" element={<Home />} />}
        {!currentUser && <Route path="/demo" element={<Demo />} />}
        <Route path="/about" element={<About />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/write" element={<Write />} />
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/editPost/:postId" element={<EditPost />} />
        <Route
          path="*"
          element={<Navigate to={!currentUser ? "/demo" : "/"} />}
        />
      </Routes>
    </>
  );
};

export default App;
