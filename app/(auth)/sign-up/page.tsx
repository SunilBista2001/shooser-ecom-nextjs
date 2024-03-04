import { authAction } from "@/actions";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

const SignUp = () => {
  return (
    <>
      <h1 className="text-xl mt-1 text-center">
        Sign up to <span className="text-blue-500 font-medium">Shooeser</span>
      </h1>
      <form action={authAction} className="flex justify-center my-2">
        <Button>
          <GithubIcon width={20} height={20} className="mr-1" />
          Sign up with Github
        </Button>
      </form>
      <p className="space-x-1 text-center text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-blue-500 hover:underline">
          Sign in
        </Link>
      </p>
    </>
  );
};

export default SignUp;
