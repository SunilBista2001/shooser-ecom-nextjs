"use client";

import { logoutOaction } from "@/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddProductModal from "../modal/AddProductModal";

const UserAccountNav = ({
  name,
  img,
  role,
}: {
  name: string;
  img: string;
  role: string;
}) => {
  const router = useRouter();

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <Dialog>
      {openModal && <AddProductModal />}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer">
            <AvatarImage src={img} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/cart")}>
            Check Cart
          </DropdownMenuItem>

          {role === "admin" && (
            <DialogTrigger onClick={() => setOpenModal(!openModal)}>
              <DropdownMenuItem>Add Product</DropdownMenuItem>
            </DialogTrigger>
          )}

          <DropdownMenuSeparator />
          <form onClick={logoutOaction}>
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
};

export default UserAccountNav;
