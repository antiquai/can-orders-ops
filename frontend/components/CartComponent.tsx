"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartItem } from "./Catalog";

interface Props {
  items: CartItem[];
  onRemove: (id: number) => void;
  onClear: () => void;
}

export default function CartComponent({ items, onRemove, onClear }: Props) {
  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  const [user_name, setUserName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setLoading(true);

    const orderData = {
      customer_name: user_name,
      customer_surname: surname,
      customer_email: email,
      address: address,
      items: items.map(item => ({
        name: item.name,
        price: item.price,
        qty: item.qty
      })),
      total_price: total,
    }

    try {
      const response = await fetch("http://localhost:8000/buy/1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
      if (response.ok) {
        alert("Order placed successfully!");
        onClear();
        setAddress("");
        setEmail("");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("BACKEND OFFLINE")
      console.log(orderData)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full font-mono pt-32">
      <h2 className="text-3xl font-black uppercase mb-10">Your Bag</h2>
      <h3 className="text-[10px] tracking-[0.3em] text-black uppercase font-medium">Drag to the left to remove from the cart</h3>
      <div className="flex-1 space-y-4 overflow-x-hidden">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              /* 1. ANIMATION SETTINGS */
              initial={{ x: 50, opacity: 0 }}   // Starts slightly right and invisible
              animate={{ x: 0, opacity: 1 }}    // Slides into place
              exit={{ x: -100, opacity: 0 }}    // Slides LEFT and fades out on delete
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              
              /* 2. DRAG TO DELETE LOGIC */
              drag="x"
              dragConstraints={{ left: -100, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) onRemove(item.id);
              }}
              
              className="flex justify-between items-baseline bg-white cursor-grab active:cursor-grabbing"
            >
              <div className="flex gap-2 items-baseline">
                <span className="text-sm font-bold uppercase">{item.name}</span>
                {item.qty > 1 && <span className="text-[10px] text-zinc-400">x{item.qty}</span>}
              </div>
              
              <div className="flex-1 mx-2 border-b border-dotted border-zinc-200" />
              
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold">{(item.price * item.qty)}$</span>
                
                {/* Manual Delete Button for Desktop */}
                <button 
                  onClick={() => onRemove(item.id)}
                  className="text-[10px] text-red-500 hover:text-red-700 font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  [DEL]
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>   

      {/* Footer / Summary */}
      <div className="mt-auto pt-6 space-y-6">
        <div className="border-t-2 border-black pt-4 flex justify-between items-center font-black text-xl uppercase">
          <span>Total</span>
          <span>{total}$</span>
        </div>

        <div className="space-y-4">
          <input value={user_name} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="NAME" className="w-full bg-zinc-100 p-3 text-[13px] h-14 font-bold uppercase outline-none focus:bg-zinc-200" />
          <input value={surname} onChange={(e) => setSurname(e.target.value)} type="text" placeholder="SURNAME" className="w-full bg-zinc-100 p-3 text-[13px] h-14 font-bold uppercase outline-none focus:bg-zinc-200" />
          <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="SHIPPING ADDRESS" className="w-full bg-zinc-100 p-3 text-[13px] h-14 font-bold uppercase outline-none focus:bg-zinc-200" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="EMAIL@CONTACT.COM" className="w-full bg-zinc-100 p-3 text-[13px] h-14 font-bold outline-none focus:bg-zinc-200" />

          <button 
            disabled={items.length === 0 || loading}
            className="w-full bg-black text-white py-5 font-black uppercase tracking-[0.2em] text-[13px] h-14 hover:bg-zinc-800 disabled:bg-zinc-100 disabled:text-zinc-300 transition-all"
            onClick={handleCheckout}
            >
            {loading ? "Processing..." : "Checkout →"}
          </button>
        </div>
      </div>
    </div>
  );
}

