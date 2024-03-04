"use client";

import Heading from "@/components/shared/Heading";
import CartItem from "@/components/shared/carts/CartItem";
import Summary from "@/components/shared/carts/Summary";
import useCart from "@/store/cart";
import toast from "react-hot-toast";

const CartPage = () => {
  const setCart = useCart();
  const cart = useCart((state) => state.items);

  const deleteAllCartItems = async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
      });

      await res.json();

      setCart.removeAll();
    } catch (error) {
      console.log(error);
    } finally {
      toast.success("All items removed from cart");
    }
  };

  return (
    <div className="flex flex-col px-4 sm:px-6 md:px-10 lg:px-16 xl:px-28">
      <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
        <div className="lg:col-span-7">
          <Heading
            title={`Shopping Cart`}
            description="No Items added into the Cart"
          />
          <ul>
            {/* @ts-ignore */}
            {cart?.products?.map((item) => (
              <CartItem
                key={item.id}
                id={item.productId}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))}
          </ul>
        </div>
        <Summary />
      </div>
    </div>
  );
};

export default CartPage;
