import Link from "next/link";
import React from "react";

const MobileNav = () => {
  return (
    <div className="flex lg:hidden ">
      <Link href="/">
        <p className="font-bold lg:inline-block  -space-x-1">
          Shooe <span className="text-emerald-600">ser</span>
        </p>
      </Link>
    </div>
  );
};

export default MobileNav;
