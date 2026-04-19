"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import CartComponent from "./CartComponent";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  qty: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Y2K Keychain",
    price: 14,
    image: "images/1.jpg",
  },
  {
    id: 2,
    name: "Astroboy Keychain",
    price: 19,
    image: "images/4.jpg",
  },
  {
    id: 3,
    name: "Cone//55",
    price: 40,
    image: "images/3.jpg",
  }
];

export default function Catalog() {

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const isItemInCart = currentCart.find((item) => item.id === product.id);

      if (isItemInCart) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...currentCart, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((currentCart) => currentCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  }

 return (
  <div className="h-screen flex bg-white font-sans overflow-hidden p-10 pt-56">
    
    {/* Catalog and items for sale */}
    <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8">
      <header className="px-10">
        <h2 className="text-[8rem] font-bold leading-tight tracking-tighter mb-8">
          Catalog
        </h2>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12 pb-20">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
      </main>
    </div>

    {/* Cart Component */}
    <aside className="w-112.5 border-l border-gray-100 bg-white">
      <CartComponent items={cart} onRemove={removeFromCart} onClear={clearCart}/>
    </aside>
    
  </div>
);
};