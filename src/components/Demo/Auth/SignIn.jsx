import React, { useState } from "react";
import Input from "../../../utils/Input";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebaseConfig";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setCreateUser, setModal }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (form[("email", "password")] === "") {
      toast.error("All Field Are Required!");
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/");
      toast.success("LoggedIn Successfuly!");
      setModal(false)
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("User does not exist. Please check your credentials.");
      }
      else {
        toast.error(error.code);
      }
    }finally{
      setLoading(false);
    }
  };
  return (
    <div className="mt-[10rem] text-center flex flex-col ">
      <h2 className="text-3xl font-semibold ">Sign In With Email</h2>
      <form onSubmit={handleLogin} className="mt-[5rem]">
        <Input form={form} setForm={setForm} type="email" title="email" />
        <Input form={form} setForm={setForm} type="password" title="password" />
        <button
          className={`px-5 py-3 mt-10 text-sm  rounded-full bg-red-900 text-white  hover:shadow-lg hover:shadow-gray-500 duration-200 ${
            loading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          Sign In
        </button>
      </form>
      <div className=" flex justify-center mt-20 gap-2 items-center">
        <p>Don't Have Account?</p>
        <button
          onClick={() => setCreateUser("signup")}
          className="text-red-700 underline hover:text-black duration-200 font-medium"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default SignIn;
