"use client";
import Center from "@/ui/center";
import { useRouter } from "next/navigation";
// import { stringify } from "querystring";
// import "../global.css";
import { useState } from "react";
import GoogleButton from "react-google-button";

export default function Login() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const formHandler = async (e: any) => {
    e.preventDefault();
    const userData = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(input),
    });
    const xyz = await userData.json();
    if (userData.ok) {
      router.push("/login");
    }
  };
  return (
    <Center>
      <form action="" onSubmit={formHandler}>
        <div className=" flex flex-col gap-5  p-5">
          <label className="text-2xl"> Sign-Up</label>
          <input
            value={input.username}
            onChange={(e) => setInput({ ...input, username: e.target.value })}
            className="border border-solid border-gray-400 rounded placeholder:pl-1"
            type="text"
            placeholder="Username"
          />
          <input
            className="border border-solid border-gray-400 rounded placeholder:pl-1"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
            type="text"
            placeholder="Email"
          />
          <input
            type="text"
            placeholder="Password"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
            className="border border-solid border-gray-400 rounded placeholder:pl-1"
          />
          <button className="border bg-black text-gray-200 p-1.5">
            Sign-up
          </button>
        </div>
      </form>
      <div className=" flex  flex-col   items-center p-5">
        <GoogleButton label="SignUp with Google"></GoogleButton>
      </div>
    </Center>
  );
}
