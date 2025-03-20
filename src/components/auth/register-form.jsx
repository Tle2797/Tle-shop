'use client'

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export function RegisterForm({ className, ...props }) {
  const router = useRouter();
  const { data: session, status: loginStatus } = useSession();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullname: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData);

      if (formData.password !== formData.confirmPassword) {
        setError("รหัสผ่านไม่ตรงกัน");
        setLoading(false);
        return false;
      }

      const data = {
        email: formData.email,
        password: formData.password,
        fullname: formData.fullname,
      };

      const register = await axios.post("/api/authen/register", data);

      if (register.data.error) {
        setError(`ไม่สามารถลงทะเบียนได้ เนื่องจาก: ${register.data.message}`);
        setLoading(false);
        return false;
      }

      toast("ลงทะเบียนสำเร็จ", {
        description: "ยินดีด้วย ตอนนี้คุณสามารถเข้าสู่ระบบได้แล้ว",
      });

      router.push("/login");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleLoginWithLine = () => {
    signIn("line");
  };
  const handleLoginWithGoogle = () => {
    signIn("google");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">ลงทะเบียน</CardTitle>
          <CardDescription>กรุณากรอกข้อมูลเพื่อลงทะเบียน</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="text-red-500 font-medium">
              <p>{error}</p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="fullname">ชื่อ-สกุล</Label>
                <Input
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                  type="text"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">อีเมล</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">รหัสผ่าน</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                ลงทะเบียน
              </Button>
              <Button onClick={handleLoginWithLine} variant="outline" className="w-full">
                ลงทะเบียนด้วย LINE
              </Button>
              <Button onClick={handleLoginWithGoogle} variant="outline" className="w-full">
                ลงทะเบียนด้วย GOOGLE
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account? {" "}
              <a href="/login" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
