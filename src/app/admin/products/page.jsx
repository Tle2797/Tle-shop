"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/fechData";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { FromDialogProduct } from "@/components/admin/form-dialog-product";

const MangeProductPage = () => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(`/api/products`, fetcher);

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center py-4">{error.message}</div>;

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">จัดการสินค้า</h2>

        <div className="flex gap-3">
          <Button
            className="bg-black text-white px-4 py-2"
            onClick={() => router.push("/admin/products/add")}
          >
            + เพิ่มสินค้า
          </Button>
          <FromDialogProduct />
        </div>
      </div>

      <Table className="w-full border rounded-lg shadow-md">
        <TableCaption>รายการสินค้าของคุณ</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[100px] text-center">ID</TableHead>
            <TableHead className="text-center">รูปภาพ</TableHead>
            <TableHead className="text-center">ชื่อสินค้า</TableHead>
            <TableHead className="text-center">ราคา</TableHead>
            <TableHead className="text-center">สต๊อกสินค้า</TableHead>
            <TableHead className="text-center">จัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products?.map((product) => (
            <TableRow key={product.id} className="border-b hover:bg-gray-50">
              <TableCell className="text-center font-medium">
                {product.id}
              </TableCell>
              <TableCell className="text-center w-20">
                {" "}
                {/* เพิ่ม width ที่เหมาะสม */}
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-auto object-cover rounded-md border" // ทำให้ภาพเต็มความกว้างของเซลล์
                />
              </TableCell>
              <TableCell className="text-center">{product.name}</TableCell>
              <TableCell className="text-center">
                {product.price.toLocaleString()}
              </TableCell>
              <TableCell className="text-center">
                {product.stock_quantity}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-2">
                  <Button className="bg-yellow-500 text-white px-2 py-1">
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="destructive"
                    className="px-2 py-1 transition-all hover:bg-red-600 hover:scale-105"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-gray-100">
          <TableRow>
            <TableCell colSpan={4} className="text-right font-semibold">
              รวมทั้งหมด
            </TableCell>
            <TableCell className="text-center font-semibold">
              ฿2,500.00
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default MangeProductPage;
