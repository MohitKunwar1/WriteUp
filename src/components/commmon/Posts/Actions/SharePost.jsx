import React, { useState } from "react";
import DropDown from "../../../../utils/DropDown";
import { CiShare1 } from "react-icons/ci";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import {
  BiLink,
  BiLogoFacebookCircle,
  BiLogoLinkedinSquare,
  BiLogoTwitter,
} from "react-icons/bi";
import toast from "react-hot-toast";

const SharePost = () => {
  const [showDrop, setShowDrop] = useState(false);

  const path = window.location.href;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(path);
      toast.success("Link has been copied.");
      setShowDrop(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setShowDrop(false);
    }
  };
  return (
    <div className="relative">
      <button onClick={() => setShowDrop(!showDrop)}>
        <CiShare1 className="text-2xl" />
      </button>
      <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[12rem]">
        <Button click={copyLink} title="Copy Link" icon={<BiLink />} />
        <FacebookShareButton url={path}>
          <Button title="Share on FaceBook" icon={<BiLogoFacebookCircle />} />
        </FacebookShareButton>
        <TwitterShareButton url={path}>
          <Button title="Share On Twitter" icon={<BiLogoTwitter />} />
        </TwitterShareButton>
        <LinkedinShareButton url={path}>
          {" "}
          <Button
            title="Share On Linkedin"
            icon={<BiLogoLinkedinSquare />}
          />{" "}
        </LinkedinShareButton>
      </DropDown>
    </div>
  );
};

export default SharePost;

const Button = ({ click, title, icon }) => {
  return (
    <>
      <button
        onClick={click}
        className="p-2 hover:bg-gray-200 text-gray-500 hover:text-black/80 duration-200 w-full text-sm text-left flex items-center gap-2 cursor-pointer"
      >
        {" "}
        <span className="text-[1.2rem] ">{icon}</span>
        {title}
      </button>
    </>
  );
};
