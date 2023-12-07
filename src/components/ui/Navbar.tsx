/* eslint-disable no-unused-vars */
"use client";

import Link from "next/link";
import {Icons} from "../Icons"
import { buttonVariants } from "./Button";
const Navbar = async () => {

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-350 z-[10] py-2">
      <header className="container max-w-7xl h-full mx-auto flex items-center justify gap-2">
        {/* {logo} */}
        <nav className="flex justify-between items-center px-10 py-4 w-full min-w-fit">
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Breaddit
          </p>
          <Link href="/sign-in" className="">
            <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6"></Icons.logo>
            Sign In
          </Link>
          {/* search */}

          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
