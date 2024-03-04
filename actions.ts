"use server";

import { signOut } from "@/lib/auth";

export const logoutOaction = async () => {
  await signOut();
};
