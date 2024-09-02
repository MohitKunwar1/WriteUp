import React, { useState } from "react";
import ReactQuill from "react-quill";
import Preview from "./Preview";
import { Blog } from "../../../Context/Context";

const Write = () => {
  const { publish, setPublish } = Blog();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  return (
    <section className=" w-[90%] md:w-[80%] lg:w-[60%]  mx-auto py-[3rem]">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="text-4xl outline-none w-full"
      />
      <ReactQuill
        theme="bubble"
        value={description}
        onChange={setDescription}
        placeholder="Tell Your Story..."
        className=" write my-5 "
      />
      <div
        className={`${
          publish ? "visible opacity-100" : "invisible opacity-0"
        } transition-all duration-200`}
      >
        <Preview
          setPublish={setPublish}
          title={title}
          description={description}
        />
      </div>
    </section>
  );
};

export default Write;
