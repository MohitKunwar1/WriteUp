import React, { useState } from "react";
import Input from "../../../utils/Input";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../lib/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

const SignUp = ({ setCreateUser, setModal }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });

  const handleSingup = async (e) => {
    e.preventDefault();
    if (form[("username", "email", "password", "repassword")] === "") {
      toast.error("All fields are required!");
    } else if (form["password"] !== form["repassword"]) {
      toast.error("Your password is not matching!");
    } else {
      try {
        setLoading(true);
        const { user } = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
        const ref = doc(db, "users", user.uid);
        const userDoc = await getDoc(ref);
        if (!userDoc.exists()) {
          await setDoc(ref, {
            username : form.username,
            userId: user.uid,
            email: form.email,
            userImg: "",
            coverImg: "",
            bio: "",
          });
          navigate("/");
          toast.success("SignedUp Complete!");
          setModal(false);
          setLoading(false);
        }
      } catch (error) {
        if(error.code == "auth/email-already-in-use"){
          toast.error("Email-already-in-use")
        }else{
          toast.error("Something went wrong!")
        }
      }
    }
  };7
  return (
    <div className="mt-[10rem] text-center flex flex-col ">
      <h2 className="text-3xl font-semibold ">Create An Account</h2>
      <p className="pt-1 text-lg font-semibold">Sign Up With Email</p>
      <form onSubmit={handleSingup} className="mt-[1rem]">
        <Input form={form} setForm={setForm} type="username" title="username" />
        <Input form={form} setForm={setForm} type="email" title="email" />
        <Input form={form} setForm={setForm} type="password" title="password" />
        <Input
          form={form}
          setForm={setForm}
          type="password"
          title="repassword"
        />
        <button
          className={`px-5 py-3 mt-10 text-sm  rounded-full bg-emerald-700 text-white hover:shadow-lg hover:shadow-gray-500 duration-200${
            loading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          Sign Up
        </button>
      </form>
      <div className=" flex justify-center mt-20 gap-2 items-center">
        <p>Already Have Account</p>
        <button
          onClick={() => setCreateUser("")}
          className="text-emerald-700 underline hover:text-black duration-200 font-medium"
        >
          Go To Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUp;
