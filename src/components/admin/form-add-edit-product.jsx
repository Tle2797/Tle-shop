"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast, Toaster } from "sonner";

const createProduct = async (formData) => {
  try {
    const response = await axios.post("/api/products/createProduct", formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "เกิดข้อผิดพลาดในการสร้างสินค้า"
      );
    }
  }
};

const FormAddEditProduct = ({ product }) => {
  const isEditing = !!product;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const defaultValues = {
    name: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const values = watch();
  console.log("🚀 ~ FormAddEditProduct ~ errors:", errors);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("🚀 ค่าทั้งหมดที่ได้จาก form :", data);
      const result = await createProduct(data);
      toast.success("สร้างสินค้าสำเร็จ");
      reset();
    } catch (error) {
      setError(error.message || "เกิดข้อผิดพลาดในการสร้างสินค้า");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{isEditing ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <div className="mb-3">
            <label htmlFor="name">ชื่อสินค้า</label>
            <Input
              id="name"
              {...register("name", { required: "กรุณากรอกชื่อสินค้า" })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="description">
            <label htmlFor="description">รายละเอียดสินค้า</label>
            <Input id="description" {...register("description")} />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="price">
            <label htmlFor="price">ราคาสินค้า</label>
            <Input
              type="number"
              id="price"
              {...register("price", { required: "กรุณากรอกราคาสินค้า" })}
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div className="stock">
            <label htmlFor="stock">จำนวนสินค้าในคลัง</label>
            <Input
              type="number"
              id="stock"
              {...register("stock", { required: "กรุณากรอกจำนวนสินค้า" })}
            />
            {errors.stock && (
              <p className="text-red-500">{errors.stock.message}</p>
            )}
          </div>
        </div>
        <div className="text-right">
          <Button disabled={loading} className="mt-3" type="submit">
            {loading
              ? "กำลังสร้างสินค้า"
              : isEditing
              ? "แก้ไขข้อมูลสินค้า"
              : "เพิ่มสินค้าใหม่"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormAddEditProduct;
