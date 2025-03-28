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
    throw new Error(
      error.response?.data?.message || "เกิดข้อผิดพลาดในการสร้างสินค้า"
    );
  }
};

const FormAddEditProduct = ({ product, closeDialog = null }) => {
  const isEditing = !!product;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const defaultValues = {
    name: product?.name || "",
    price: product?.price || "",
    stock: product?.stock || "",
    description: product?.description || "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("ไฟล์รูปภาพต้องไม่เกิน 5MB");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (!imageFile) {
        toast.error("กรุณาเลือกรูปภาพสินค้า");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      });
      formData.append("image", imageFile);

      console.log("Form Data:", formData);
      const result = await createProduct(formData);

      toast.success("สร้างสินค้าสำเร็จ");
      reset();
      setImageFile(null);
      setImagePreview("");
      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster />
      <h1 className="text-2xl font-semibold text-center mb-6">
        {isEditing ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <div>
            <label htmlFor="name">ชื่อสินค้า</label>
            <Input
              id="name"
              {...register("name", { required: "กรุณากรอกชื่อสินค้า" })}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="description">รายละเอียดสินค้า</label>
            <Input id="description" {...register("description")} />
          </div>
          <div>
            <label htmlFor="price">ราคาสินค้า</label>
            <Input
              type="number"
              id="price"
              {...register("price", { required: "กรุณากรอกราคาสินค้า" })}
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>
          <div>
            <label htmlFor="stock">จำนวนสินค้าในคลัง</label>
            <Input
              type="number"
              id="stock"
              {...register("stock", { required: "กรุณากรอกจำนวนสินค้า" })}
            />
            {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="picture">รูปภาพ</label>
            <Input id="picture" type="file" onChange={handleImageChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="w-20 h-20 object-cover border rounded-md"
              />
            )}
          </div>
        </div>
        <div className="text-right">
          <Button disabled={loading} className="mt-3" type="submit">
            {loading
              ? "กำลังดำเนินการ..."
              : isEditing
              ? "แก้ไขสินค้า"
              : "เพิ่มสินค้าใหม่"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormAddEditProduct;
