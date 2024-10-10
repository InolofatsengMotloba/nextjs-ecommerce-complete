"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/config/auth";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      alert("User created successfully");
      router.push("/login"); // Redirect to login page after successful registration
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-2 text-center text-black">
          Create an account
        </h2>
        <p className="mb-6 text-gray-500 text-center">
          Sign up and be part of the HerStore community
        </p>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-[#2d7942] focus:border-[#2d7942] transition duration-150 ease-in-out"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-[#2d7942] focus:border-[#2d7942] transition duration-150 ease-in-out"
            />
            {/* Password Visibility Toggle */}
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center pt-6 text-gray-500"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <span className="material-icons">hide</span>
              ) : (
                <span className="material-icons">show</span>
              )}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#2d7942] text-white py-3 rounded-lg hover:bg-[#256b3a] transition duration-150 ease-in-out"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account link */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#2d7942] hover:underline transition duration-150 ease-in-out"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
