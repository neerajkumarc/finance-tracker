"use client";
import { signout } from "@/actions/auth";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await signout();
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleLogout}>
        <Button type="submit" disabled={loading} className="w-full">
          <LogOutIcon/>
          {loading ? "Signing out..." : "Sign out"}
        </Button>
      </form>
    </div>
  );
};

export default Logout;
