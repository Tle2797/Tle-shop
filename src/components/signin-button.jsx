"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const SigninButton = () => {
  const { data: session, status: loginStatus } = useSession();

  const isLogin = loginStatus === "authenticated";
  const router = useRouter();
  return (
    <div className="flex gap-2 justify-center">
      <Button
        variant="secondary"
        onClick={() => {
          router.push("/register");
        }}
      >
        สมัครสมาชิก
      </Button>
      {isLogin ? (
        <Button
          variant="destructive"
          onClick={() => {
            signOut();
          }}
        >
          ออกจากระบบ
        </Button>
      ) : (
        <Button
          onClick={() => {
            router.push("/login");
          }}
        >
          เข้าสู่ระบบ
        </Button>
      )}
    </div>
  );
};

export default SigninButton;
