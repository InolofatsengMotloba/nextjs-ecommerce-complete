"use client";

import { signOutUser } from "@/config/auth";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOutUser();
      router.push("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return <button onClick={handleLogout}>Sign Out</button>;
}
