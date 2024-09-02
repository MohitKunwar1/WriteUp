import React from "react";

const Banner = () => {
  return (
    <div className="w-[33rem] sm:w-full bg-emerald-700 border-b-2 border-black">
      <div className="py-[5rem] flex flex-col items-start">
        <div className="leading-tight pl-10 sm:pl-20 ">
          <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] sm:font-semibold font-bold">
            Your Passion,
          </h1>
          <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] sm:font-semibold font-bold">
            Your Way,
          </h1>
          <h1 className="text-[3rem] sm:text-[4rem] md:text-[4rem] sm:font-semibold font-bold text-start">
            Your Blog.
          </h1>
        </div>
        <p className="w-full md:w-[34rem] text-[1.1rem] md:text-[1.3rem]  font-medium sm:pl-20 pl-10 mt-8">
          Create Your story, Create your blog easily.
        </p>
        <button className="px-6 py-2 text-[1.2rem] font-normal ml-10 sm:ml-20 mt-8 bg-black text-white rounded-full ">Start Reading</button>
      </div>
    </div>
  );
};

export default Banner;
