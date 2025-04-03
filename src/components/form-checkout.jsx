"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React, { useState, useEffect } from "react"; // เพิ่ม useEffect
import useCartStore from "@/lib/store/cart";
import { Trash } from "lucide-react";
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function FormCheckout() {
  const items = useCartStore((stest) => stest.items);
  const total = useCartStore((stest) => stest.getTotalPrice);
  // const removeCartItem = useCartStore((state) => state.removeItem); // Access removeItem from store
  console.log("🚀 ~ FormCheckout ~ total:", total());

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [formattedTotal, setFormattedTotal] = useState(""); // สร้าง state สำหรับฟอร์แมต total
  const [openDialog, setopenDialog] = useState(false)
  const [responseOrder, setresponseOrder] = useState(null)

  const handleSubmit = async () => {
    if (name === '' || email === '' || address === '') {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง")
      return
    }

    try {
      const data = {
        name,
        email,
        address,
        items,
        total : 42920,
      };
      const res = await axios.post("/api/orders/create", data);

      console.log("🚀 ~ handleSubmit ~ res:", res)
      setresponseOrder(res.data)
      setopenDialog(true)


    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error)
      alert("เกิดข้อผิดพลาด ลองใหม่อีกครั้ง")
      return
    }

  };

  // ฟังก์ชันสำหรับการลบสินค้าจากตะกร้า
  // const handleDeleteCart = (id) => {
  //   const confirmDelete = window.confirm("คุณต้องการลบสินค้านี้หรือไม่?");
  //   if (confirmDelete) {
  //     removeCartItem(id); // Calls the removeItem function to remove the item from the cart
  //   }
  // };

  // ใช้ useEffect เพื่อฟอร์แมต total เมื่อ total เปลี่ยน
  useEffect(() => {
    setFormattedTotal(parseFloat(total()).toLocaleString("th-TH"));
  }, [total]);

  return (
    <>
      <main className="container mx-auto my-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <h1 className="text-2xl font-bold px-5">ตะกร้าของฉัน</h1>
          <div className="mt-4 space-y-4">
            {items?.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-950"
                >
                  <img
                    src={item.image}
                    width={80}
                    height={80}
                    alt="Product Image"
                    className="rounded-md"
                    style={{ aspectRatio: "80/80", objectFit: "cover" }}
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Black, Large
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span>1</span>
                    <Button variant="outline" size="icon">
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-right font-medium">
                    ฿{parseFloat(item.price).toLocaleString("th-TH")}
                  </div>
                  <Button
                    onClick={() => handleDeleteCart(item.id)} // Calls handleDeleteCart with item id
                    variant="destructive"
                    size="icon"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>฿{formattedTotal}</span> {/* ใช้ formattedTotal ที่ฟอร์แมตแล้ว */}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Shipping &amp; Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" value={address}
                  onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, Anytown USA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment">วิธีชำระเงิน</Label>
                <p>รับชำระเงินด้วย QR code (Promptpay)</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} className="w-full">สั่งซื้อสินค้า</Button>
            </CardFooter>
          </Card>
          <Dialog open={openDialog} onOpenChange={setopenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>ชำระเงิน</DialogTitle>
                <DialogDescription>
                  รายละเอียดการจำระเงิน
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center items-center flex-col">
                {responseOrder?.success ? (<img className="max-w-xs"
                  src={responseOrder?.qrcodeUrl} alt="" />)
                  : null}
                  <p>จำนวนที่ต้องจ่าย : {total().toLocaleString("th-TH")}</p>
              </div>
            </DialogContent>
          </Dialog>

        </div>
      </main>
      <footer className="bg-gray-100 py-6 dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between px-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; 2024 Acme Store. All rights reserved.
          </p>
          <nav className="flex space-x-4">
            <Link href="#" className="text-sm hover:underline" prefetch={false}>
              Privacy
            </Link>
            <Link href="#" className="text-sm hover:underline" prefetch={false}>
              Terms
            </Link>
            <Link href="#" className="text-sm hover:underline" prefetch={false}>
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}

function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
