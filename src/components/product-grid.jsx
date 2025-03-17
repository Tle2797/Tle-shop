'use client'
import React, { useState } from "react";
import Productcard from "./product-card";
import useCartStor from "@/lib/store/cart";

const ProductGrid = ({ children, products }) => {
  // console.log("สินค้าทั้งหมด : ", products);

  const [category,setcategory] = useState([

    {
      id:1,
      name:'All'
    },
    {
      id:2,
      name:'เสื้อผ้า'
    },
    {
      id:3,
      name:'อุปกรณ์อิเล็กทรอนิกส์'
    }
  ])

  const {items} = useCartStor();

  return (
    <div
      className="grid grid-cols-2 gap-4 md:grid-cols-3
    lg:grid-cols-4"
    >
      {products.map((item, index) => {
        return <Productcard category={category} product={item} key={item.id}/>
      })}
    </div>
  );
};

export default ProductGrid;
