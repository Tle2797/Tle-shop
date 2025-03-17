'use client'
import { products } from '@/lib/mock-data'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import useCartStore from '@/lib/store/cart'
import {toast} from 'sonner'
import useSWR from 'swr'
import { fetcher } from '@/lib/fechData'

const ProductDetail = ({ id }) => {
  
  const { data, error, isLoading } = useSWR(`/api/products/${id}`, fetcher)

  console.log("🚀 ~ ProductDetail ~ data:", data)

  const product = data?.product;
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  console.log("🚀 ~ ProductDetail ~ items:", items);

  const handleAddToCart = () => {
    try {
      if (!product) return;

      const data = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url
      };

      addItem(data);
      toast.success("เพิ่มสินค้าเรียบร้อยแล้ว",{
        description : `เพิ่ม ${product.name} ลงในตระกร้าแล้ว`
      })

    } catch (error) {
      toast.error("ไม่สามารถเพิ่มสินค้าได้ลองใหม่อีกครั้ง")
    }
  };

  // if (!product) return <div>ขออภัยไม่พบสินค้า</div>;

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid gap-3 grid-cols-2'>
        <div className='space-y-3'>
          <div className='relative aspect-square overflow-hidden rounded-lg'>
            <Image src={product.image_url} alt={product.name} fill className='object-cover' />
          </div>
        </div>
        <div>
          <p className='text-3xl font-bold'>{product.name}</p>
          <p>{product.price}</p>
          <Button onClick={handleAddToCart}>เพิ่มลงตะกร้า</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;