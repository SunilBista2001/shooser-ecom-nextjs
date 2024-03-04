"use client";

import { Button } from "../ui/button";
import { IndianRupee, Loader2, ShoppingCart } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";
import { useState } from "react";
import useCart from "@/store/cart";
import { formatPrice } from "@/lib/utils";

const Info = ({
  id,
  name,
  description,
  price,
}: {
  id: string;
  name: string;
  description: string;
  price: number;
}) => {
  //

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cart = useCart();

  const addToCart = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ productId: id, quantity: 1 }),
      });

      const data = await response.json();

      cart.addItem(data);
      toast.success("Item added to cart");
    } catch (error) {
      setIsLoading(false);
      toast.error("Item already added to cart");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900">{name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <h2 className="text-2xl font-medium text-gray-900 flex items-center">
          {formatPrice(price)}
        </h2>
      </div>
      <p className="my-2 text-muted-foreground">Inclusive of all taxes</p>
      <Separator className="my-4" />
      <div className="flex flex-col gap-y-6">
        <h3 className="font-medium">Description :</h3>

        <p>{description}</p>
      </div>
      <div className="mt-10 flex items-center gap-x-3" onClick={addToCart}>
        <Button className="flex items-center gap-x-2">
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <>
              Add To Cart
              <ShoppingCart />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Info;
