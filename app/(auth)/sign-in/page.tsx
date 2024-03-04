import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";
import Link from "next/link";
import React from "react";

const SignIn = () => {
  //
  //
  const loginWithGithub = async () => {
    "use server";
    await signIn("github");
  };

  return (
    <>
      <h1 className="text-xl mt-1 text-center">
        Sign In to <span className="text-blue-500 font-medium">Shooeser</span>
      </h1>
      <form action={loginWithGithub} className="flex justify-center my-2">
        <Button>Sign in with Github</Button>
      </form>
      <p className="space-x-1 text-center text-sm">
        New to Shooeser?{" "}
        <Link href="/sign-up" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );
};

export default SignIn;
