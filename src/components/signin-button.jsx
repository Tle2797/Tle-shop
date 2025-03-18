"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const SigninButton = () => {
  const router = useRouter();
  return (
    <div className="flex gap-2 justify-center">
      <Button
        onClick={() => {
          router.push("/login");
        }}
      >
        เข้าสู่ระบบ
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          router.push("/register");
        }}
      >
        สมัครสมาชิก
      </Button>
      <Button
        variant="destructive"
        onClick={() => {
          signOut();
        }}
      >
        ออกจากระบบ
      </Button>
    </div>
  );
};

export default SigninButton;
