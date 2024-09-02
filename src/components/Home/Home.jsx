import React from "react";
import Posts from "../commmon/Posts/Posts.jsx";
import HomeBanner from "./HomeBanner.jsx";

const Home = () => {
  return (
    <>
      <HomeBanner />
      <section className="w-[95%] md:w-[90%] mx-auto flex gap-[5rem] relative">
        <div className="flex-[2] sm:py-10 mb-[4rem]">
          <Posts />
        </div>
      </section>
    </>
  );
};

export default Home;
