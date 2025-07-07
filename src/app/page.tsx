"use client";
import { useState } from "react";

import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    authClient.signUp.email(
      { name, email, password },
      {
        onError: () => {
          window.alert("Error in Signup::authClient.signUp.email");
        },
        onSuccess: () => {
          window.alert("Success");
        },
      }
    );
  };
  return (
    <div>
      <h1
        className="font-bold text-violet-600 font-mono
    bg-amber-200 text-center text-[40px]"
      >
        Parallax!
      </h1>
      <h2 className="p-3 text-2xl">Form</h2>
      <div className="flex flex-col items-center">
        <form className="p-4 flex flex-col space-x-3 max-w-100 space-y-3 ">
          <Input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className=" p-1 border border-amber-900 rounded"
          />
          <Input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-1 border border-amber-900 rounded"
          />
          <Input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="p-1 border border-amber-900 rounded"
          />
        </form>
        <Button onClick={handleSubmit} className="max-w-50">
          Create User
        </Button>
      </div>
    </div>
  );
}
