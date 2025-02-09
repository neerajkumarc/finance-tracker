"use client";
import { signout } from "@/actions/auth";
import React, { useState } from "react";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await signout();
    setLoading(false);
  };

  return (
    <div className=" flex items-center gap-2 bg-stone-900 text-white text-sm px-4 py-2 rounded-md cursor-pointer justify-center">
      <form onSubmit={handleLogout}>
        <button type="submit" disabled={loading}>
          {loading ? "Signing out..." : "Sign out"}
        </button>
      </form>
    </div>
  );
};

export default Logout;
