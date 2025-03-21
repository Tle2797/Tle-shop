'use client'
import useCartStore from '@/lib/store/cart'
import React from 'react'

const CartPage = () => {
    const items = useCartStore((stest) => stest.items)

    return (
        <div>
            {items.map((item, index) => (
                <div key={item.id || index} className=''>
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    )
}

export default CartPage
