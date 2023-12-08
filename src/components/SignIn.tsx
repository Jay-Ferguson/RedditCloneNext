import { FC } from "react";
import { Icons } from "./Icons";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";

const SignIn: FC = ({}) => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-xl">Welcome Back</h1>
        <p className="text-sm max-w-xs mx-auto text-zinc-800">
          By continuing, you are setting up a Breadit account and agree to our
          user agreement and Privacy Policy
        </p>
        {/* {sign in form} */}
        <UserAuthForm />
        <p className="px-10 text-center text-sm text-zinc-700">
          New to Breadit?
        </p>
        <Link href="/sign-up" className="hover:text-zinc">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
