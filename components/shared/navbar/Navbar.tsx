"use client";

import Link from "next/link";
import DesktopNav from "@/components/shared/navbar/DesktopNav";
import { buttonVariants } from "@/components/ui/button";
import UserAccountNav from "./UserAccountNav";
import CartBtn from "../carts/CartBtn";
import useCart from "@/store/cart";
import { useEffect, useState } from "react";
import { IUserDocument } from "@/models/user.model";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const cart = useCart();
  const [user, setUser] = useState<IUserDocument | null>(null);

  useEffect(() => {
    // Get Cart Items
    const getCartItems = async () => {
      try {
        const res = await fetch("/api/cart", {
          method: "GET",
        });

        const data = await res.json();

        cart.addItem(data);
      } catch (error) {
        console.log(error);
      }
    };

    // Get Me
    const getMe = async () => {
      try {
        const res = await fetch("/api/me", {
          method: "GET",
        });

        const data = await res.json();

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    getMe();

    getCartItems();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background py-3">
      <nav className="container px-4 md:px-8 lg:px-12 xl:px-20 flex items-center justify-between">
        {/* Left */}
        <DesktopNav />
        <MobileNav />

        {/* Right */}
        <div className="flex items-center gap-x-2">
          {/* <h1>Search</h1> */}
          <CartBtn />
          {user ? (
            <UserAccountNav
              name={user.username!}
              img={user.avatar!}
              role={user?.role!}
            />
          ) : (
            <Link
              href="/sign-in"
              className={buttonVariants({
                size: "sm",
              })}
            >
              Sign In
              <span className="sr-only">Sign In</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
