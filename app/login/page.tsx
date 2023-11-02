"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
// import "../global.css";
import { useState } from "react";
import GoogleButton from "react-google-button";

export default function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  const formHandler = async (e: any) => {
    e.preventDefault();
    const signInData = await signIn("credentials", {
      email: input.username,
      password: input.password,
      redirect: false,
    });
    console.log(signInData);
    if (signInData?.ok) {
      router.push("/dashboard");
    }
  };
  return (
    <div className=" flex items-center justify-center  min-h-screen bg-white-600">
      <div className=" flex flex-col border rounded bg-slate-200">
        <form onSubmit={formHandler}>
          <div className=" flex flex-col gap-5  p-5">
            <label className="text-2xl"> Login</label>
            <input
              className="border border-solid border-gray-400 rounded"
              type="text"
              placeholder="Username"
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            />
            <input
              type="text"
              placeholder="Password"
              className="border border-solid border-gray-400 rounded"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
            <button className="border bg-black text-gray-200 p-1.5">
              Login
            </button>
          </div>
        </form>
        <div className=" flex flex-col gap-5  p-5">
          <GoogleButton label="Login with Google"></GoogleButton>
        </div>
      </div>
    </div>
  );
}
