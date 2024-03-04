"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/store/cart";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

const CartBtn = () => {
  const router = useRouter();

  const cart = useCart((state) => state);

  return (
    <Button
      size="sm"
      className="gap-x-1"
      variant="outline"
      onClick={() => router.push("/cart")}
    >
      <ShoppingCart className="w-4 h-4" />
      {/* @ts-ignore */}
      {cart.items?.products?.length !== 0 && cart.items?.products?.length}
    </Button>
  );
};

export default CartBtn;
