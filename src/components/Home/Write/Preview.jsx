import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ReactQuill from "react-quill";
import TagsInput from "react-tagsinput";
import { db, storage } from "../../../lib/firebaseConfig";
import { Blog } from "../../../Context/Context";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";


const Preview = ({ setPublish, title, description }) => {
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const { currentUser, allUsers } = Blog();
  const [imgUrl, setImgUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState({
    title: "",
    photo: "",
  });
  const [tag, setTag] = useState([]);

  const handleClick = () => {
    imgRef.current.click();
  };

  useEffect(() => {
    if (title || description) {
      setPreview({ ...preview, title: title });
      setDesc(description);
    } else {
      setPreview({ ...preview, title: "" });
      setDesc("");
    }
  }, [title, description]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (preview.title === "" || desc === "" || tag.length === 0) {
        toast.error("All fields are required!");
        return;
      }

      if (preview.title.length < 15) {
        toast.error("Title must be 15 letter!");
      }

      const collections = collection(db, "posts");

      let url;
      if (imgUrl) {
        const storageRef = ref(storage, `image/${preview.photo.name}`);
        await uploadBytes(storageRef, preview?.photo);
        url = await getDownloadURL(storageRef);
      }

      await addDoc(collections, {
        userId: currentUser?.uid,
        title: preview.title,
        desc,
        tag,
        postImg: url || "",
        createdAt: Date.now(),
        pageViews: 0,
      });

      toast.success("Post has been added!");
      navigate("/");
      setPublish(false);
      setPreview({
        title: "",
        photo: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserData = allUsers?.find((user) => user.id === currentUser?.uid);

  return (
    <section className="absolute inset-0 bg-white z-50 ">
      <div className=" w-[95%] md:w-[90%] mx-auto  my-[2rem]">
        <span
          onClick={() => setPublish(false)}
          className="absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer"
        >
          <IoIosCloseCircleOutline />
        </span>
        {/* preview text */}
        <div className="mt-[8rem] flex flex-col md:flex-row gap-10">
          <div className="flex-[1]">
            <h3>Story Preview</h3>
            <div
              style={{ backgroundImage: `url(${imgUrl})` }}
              onClick={handleClick}
              className="w-full h-[200px] bg-gray-100 my-3 grid place-items-center cursor-pointer bg-cover bg-no-repeat"
            >
              {!imgUrl && "Add Image"}
            </div>
            <input
              onChange={(e) => {
                setImgUrl(URL.createObjectURL(e.target.files[0]));
                setPreview({ ...preview, photo: e.target.files[0] });
              }}
              type="file"
              ref={imgRef}
              hidden
            />
            <input
              type="text"
              value={preview.title}
              onChange={(e) => {
                setPreview({ ...preview, title: e.target.value });
              }}
              placeholder="Title"
              className="outline-none w-full border-b-2 border-gray-300 py-2"
            />
            <ReactQuill
              theme="bubble"
              value={desc}
              onChange={setDesc}
              placeholder="Tell Your Story..."
              className="border-b-2 border-gray-300 py-3 "
            />
            <p className="text-gray-500 pt-4 text-sm ">
              <span className="font-bold">Note: </span>Changes here will affect
              how your story appears in public places like WriteUp homepage.
            </p>
          </div>
          <div className="flex-[1] flex flex-col gap-4 mb-5 md:md-0 ">
            <h3 className="text-2xl ">
              Publishing to {getUserData?.username} <span className="font-bold capitalize"></span>
            </h3>
            <p className="text-gray-500 pt-1 text-sm">
              Add or changes topics up to 5 so readers know what your story is
              about.
            </p>
            <TagsInput value={tag} onChange={setTag} />
            <button
              onClick={handleSubmit}
              className="!bg-emerald-700 !px-5 !py-2 !w-fit !text-white !rounded-full hover:shadow-lg transition-all duration-200 "
            >
              {loading ? "Submitting..." : "Publish Now"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;
