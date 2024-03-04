"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../../ui/button";
import { IndianRupee, ShoppingCart, StarIcon } from "lucide-react";
import useCart from "@/store/cart";

const ProductCard = ({
  price,
  name,
  description,
  id,
}: {
  price: number;
  name: string;
  description: string;
  id: string;
}) => {
  const cart = useCart();

  const addToCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ productId: id, quantity: 1 }),
      });

      const data = await response.json();

      cart.addItem(data);

      console.log(data, "success add to cart");
    } catch (error) {
      console.log(error, "errorr brother on adding to cart");
    }
  };

  return (
    <div className="group/card shadow-lg border hover:shadow-2xl duration-300 transition-all rounded-2xl space-y-4 h-full">
      <Link href={`/products/${id}`}>
        {/* Images and Actions */}
        <div className="aspect-square m-3 rounded-2xl bg-gray-100 relative">
          <Image
            // @ts-ignore
            src={"/hero.jpg"}
            fill
            sizes="200"
            // @ts-ignore
            alt={name}
            className="aspect-square object-cover rounded-2xl"
          />
        </div>
        <div className="px-4 space-y-3 pb-6">
          <div className="space-y-1">
            {/* Product Name */}
            <p className="text-sm text-gray-500">{description}</p>
            <p
              className="font-semibold group-hover/card:text-emerald-800 text-lg truncate"
              title={name}
            >
              {name}
            </p>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} color="teal" fill="teal" />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            {/* Price */}
            <div className="font-semibold text-emerald-700 flex">
              <IndianRupee width={15} />
              {price}
            </div>
            <div className="flex justify-center group/icon">
              <Button
                aria-label="add-to-cart"
                className="bg-emerald-50 group-hover/icon:bg-emerald-500"
              >
                <ShoppingCart
                  onClick={addToCart}
                  size={20}
                  className="text-emerald-600 group-hover/icon:text-emerald-50"
                />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
