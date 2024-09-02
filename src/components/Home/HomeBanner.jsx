import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";

const HomeBanner = () => {
  const tragetRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const translate = useTransform(scrollYProgress, [0, 0.9], [0, -300]);

  return (
    <div className="w-[33rem] sm:w-[73rem] lg:w-full border-b-2 text-center">
      <div ref={tragetRef} className=" relative flex flex-col items-center  ">
        <img
          src="/homebanner.jpg"
          alt="banner"
          className="w-full h-72 sm:h-screen object-cover"
        />
        <div className="w-full sm:h-screen h-full absolute bg-white/40 inset-0 leading-tight sm:pl-20 transform -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%]  text-gray-700 ">
          <motion.div
            style={{
              // perspective: '1000px',
              translateY: translate,
            }}
            className="sm:mt-[10rem] mt-[3rem] "
          >
            <h1 className="text-[3rem]  sm:text-[13rem] font-bold sm:font-semibold pb-4 sm:pb-5 ">
              Welcome!
            </h1>
            <h2 className="text-[1rem]  sm:text-[3rem] font-medium sm:font-normal capitalize">
              Share your story, your thoughts.
            </h2>
            <h3 className="text-[1rem]  sm:text-[2rem] pt-2 sm:pt-8 font-medium sm:font-normal capitalize ">
              Create and discover amazing blog.
            </h3>
          </motion.div>
          <div className="absolute bottom-5 lg:bottom-20 left-[45%] sm:left-[50%] flex flex-col items-center cursor-pointer animate-bounce">
            <p className="text-sm sm:text-lg font-medium">View More </p>
            <MdKeyboardArrowDown className="text-xl font-medium " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
