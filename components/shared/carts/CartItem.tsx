"use client";

import useCart from "@/store/cart";
import { IndianRupee, LucideTrash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

type CartItemProps = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const CartItem = ({ id, name, price, image }: CartItemProps) => {
  const cart = useCart();

  const handleRemove = async () => {
    try {
      await fetch(`/api/cart/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.log(err);
    } finally {
      cart.removeItem(id);
      toast.success("Item removed from cart");
    }
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image fill src={"/hero.jpg"} alt={name} className="object-contain" />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0" onClick={handleRemove}>
          <LucideTrash2
            width={20}
            color="teal"
            cursor={"pointer"}
            className="hover:scale-110 duration-150 ease-out "
          />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <h1 className="sm:text-lg font-semibold text-black line-clamp-2">
              {name}
            </h1>
          </div>
          <div className="mt-1 text-sm">
            <p className="text-gray-500 sm:text-center capitalize">Jordan</p>
          </div>
          <div className="flex items-center">
            <IndianRupee size={14} color="green" />
            {price}
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
