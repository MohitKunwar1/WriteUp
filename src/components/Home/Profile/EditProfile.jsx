import { IoIosCloseCircleOutline } from "react-icons/io";
import Modal from "../../../utils/Modal";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { db, storage } from "../../../lib/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const EditProfile = ({ editModal, setEditModal, getUserData }) => {
  const imgRef = useRef(null);
  const coverImgRef = useRef(null);
  const [imgUrl, setImgUrl] = useState("");
  const [coverImgUrl, setCoverImgUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    userImg: "",
    coverImg: "",
    bio: "",
  });

  const openFile = () => {
    imgRef.current.click();
  };
  
  const openCoverFile = () => {
    coverImgRef.current.click();
  };


  //If there is a data inside our database
  useEffect(() => {
    if (getUserData) {
      setForm(getUserData);
    } else {
      setForm({ username: "", bio: "", userImg: "" , coverImg: ""});
    }
  }, [getUserData]);

  //save form
  const saveForm = async () => {
    if (form["username"] === "" || form["bio"] === "") {
      toast.error("All inputs are required!!!");
      return;
    }

    setLoading(true);

    const storageRef = ref(storage, `image/${form.userImg.name}`);
    await uploadBytes(storageRef, form?.userImg);

    const imageUrl = await getDownloadURL(storageRef);

    const coverRef = ref(storage, `image/${form.coverImg.name}`);
    await uploadBytes(coverRef, form?.coverImg);

    const covereImgUrl = await getDownloadURL(coverRef);

    try {
      const docRef = doc(db, "users", getUserData?.userId);
      await updateDoc(docRef, {
        bio: form.bio,
        username: form.username,
        userImg: imgUrl ? imageUrl : form.userImg,
        coverImg: coverImgUrl ? covereImgUrl: form.coverImg,
        userId: getUserData?.userId,
      });
      setLoading(false);
      setEditModal(false);
      toast.success("Profile has been updated");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <Modal modal={editModal} setModal={setEditModal}>
      <div className="center w-[95%] md:w-[45rem] bg-white mx-auto shadow my-[1rem] z-10 mb-[3rem] p-[2rem] rounded-lg">
        <div className="flex items-center justify-between">
          {/* head */}
          <h2 className="font-bold text-xl">Profile Information</h2>
          <button onClick={() => setEditModal(false)}>
            <IoIosCloseCircleOutline className="text-2xl" />
          </button>
        </div>
        {/* body */}
        <section className="mt-6">
          <p className="pb-3 text-sm text-gray-500">Cover Image</p>
          <div className="w-[80%] h-[8rem]">
              <img
                src={
                  coverImgUrl ? coverImgUrl : form.coverImg ? form.coverImg : "/avatar.png"
                }
                alt="image"
                className="w-full h-full object-cover border-2 border-gray-400 rounded-lg"
              />
              <input
                onChange={(e) => {
                  setCoverImgUrl(URL.createObjectURL(e.target.files[0]));
                  setForm({ ...form, coverImg: e.target.files[0] });
                }}
                type="file"
                accept="image/jpg, image/png, image/jpeg, image/gif"
                ref={coverImgRef}
                className="hidden"
              />
            </div>
            <div>
              <>
                <div className="flex justify-end gap-4 text-sm">
                  <button onClick={openCoverFile} className="text-green-600">
                    Update
                  </button>
                  <button className="text-red-600">Remove</button>
                </div>
              </>
            </div>
          <p className="pb-3 text-sm text-gray-500 ">Photo</p>
          <div className="flex gap-[2rem]">
            <div className="w-[5rem] h-[5rem]">
              <img
                src={
                  imgUrl ? imgUrl : form.userImg ? form.userImg : "/avatar.png"
                }
                alt="image"
                className="min-w-[5rem] h-full object-cover border-2 border-gray-400 rounded-full"
              />
              <input
                onChange={(e) => {
                  setImgUrl(URL.createObjectURL(e.target.files[0]));
                  setForm({ ...form, userImg: e.target.files[0] });
                }}
                type="file"
                accept="image/jpg, image/png, image/jpeg, image/gif"
                ref={imgRef}
                className="hidden"
              />
            </div>
            <div>
              <>
                <div className="flex gap-4 text-sm">
                  <button onClick={openFile} className="text-green-600">
                    Update
                  </button>
                  <button className="text-red-600">Remove</button>
                </div>
                <p className="w-full sm:w-[20rem] text-gray-500 text-sm pt-2">
                  Recomended: Square JPG, PNG, or JPEG, at least 1,000 pexels
                  per side.
                </p>
              </>
            </div>
          </div>
        </section>
        {/* profile edit form */}
        <section className="pt-[1rem] text-sm ">
          <label htmlFor="username" className="pb-3 block">
            Name*
          </label>
          <input
            onChange={(e) => {
              setForm({ ...form, username: e.target.value });
            }}
            type="text"
            id="username"
            value={form.username}
            placeholder="username..."
            className="p-1 w-full border-b-[1px] border-black outline-none"
            maxLength={50}
          />
          <p className="text-sm text-gray-500 pt-2">
            Appears on Profile page, as your byline,and in your responses.{" "}
            {form.username.length}/50
          </p>
          <section className="pt-[1rem] text-sm">
            <label htmlFor="bio" className="pb-3 block">
              Bio*
            </label>
            <input
              onChange={(e) => {
                setForm({ ...form, bio: e.target.value });
              }}
              type="text"
              id="bio"
              value={form.bio}
              placeholder="bio..."
              className="p-1 w-full border-b-[1px] border-black outline-none"
              maxLength={160}
            />
            <p className="text-sm text-gray-500 pt-2">
              Appears on Profile and next to your posts. {form.bio.length}/160
            </p>
          </section>
        </section>
        {/* Footer */}
        <div className="flex items-center justify-end gap-4 pt-[2rem]">
          <button
            onClick={() => setEditModal(false)}
            className="border-[1px] border-emerald-700 py-2 px-5 rounded-full text-emerald-700 transition-all duration-500"
          >
            Cancel
          </button>
          <button
            onClick={saveForm}
            className={`border-[1px] bg-emerald-700 py-2 px-5 rounded-full text-white ${
              loading ? "opacity-50" : ""
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfile;
