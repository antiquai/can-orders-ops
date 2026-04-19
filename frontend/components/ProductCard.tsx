import React from "react";
import { Product } from "./Catalog";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}


export default function ProductCard({product, onAdd}: Props) {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-square w-full bg-[#f5f5f5] flex items-center justify-center p-8 mb-4 overflow-hidden rounded-md">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-lg font-bold text-black">{product.name}</h3>
        <span className="text-lg font-bold text-black">
          {product.price}$
        </span>
      </div>
      <button 
        className="w-full bg-black text-white hover:bg-gray-400 transition-transform duration-100 rounded-md text-lg font-bold"
        onClick={() => onAdd(product)}
      >
        ADD
      </button>
    </div>
  );
};