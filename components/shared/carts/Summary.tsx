import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import useCart from "@/store/cart";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const Summary = () => {
  const cart = useCart();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
      });

      await res.json();
      cart.removeAll();
    } catch (error) {
      console.log(error);
      toast.error("Failed to checkout");
    } finally {
      setIsLoading(false);
      toast.success("Checkout successful");
    }
  };

  return (
    <div
      className="
      mt-16
      rounded-lg
      bg-gray-50
      px-4
      py-6
      sm:p-6
      lg:col-span-5
      lg:mt-0
      lg:p-8
    "
    >
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          {/* @ts-ignore */}

          {cart?.bill ? formatPrice(cart?.bill) : 0}
        </div>
        <Button
          onClick={handleCheckout}
          className="w-full mt-6 hover:before:-translate-x-[500px]"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>Checkout</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Summary;
