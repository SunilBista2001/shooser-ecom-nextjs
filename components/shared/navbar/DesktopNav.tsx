"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

const DesktopNav = () => {
  return (
    <div className="hidden lg:flex gap-x-8 items-center">
      <Link href="/">
        <p className="hidden font-bold lg:inline-block  -space-x-1">
          Shooe <span className="text-emerald-600">ser</span>
        </p>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Lobby</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Image
                        src={"/hero.jpg"}
                        alt=""
                        width={120}
                        height={120}
                      />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Shooser
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        An open source ecommerce shoe shop built with everything
                        new in Next.js
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNav;
