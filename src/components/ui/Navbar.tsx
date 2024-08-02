/* eslint-disable no-unused-vars */
import Link from "next/link";
import { Icons } from "../Icons";
import { buttonVariants } from "./Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "../UserAccountNav";



const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-350 z-[10] py-2">
      <header className="container max-w-7xl h-full mx-auto flex items-center justify gap-2">
        {/* {logo} */}
        <nav className="flex justify-between items-center px-10 py-4 w-full min-w-fit">
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Breadit
          </p>
          <Link href="/sign-in" className="text-zinc-900">
            <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6"></Icons.logo>
            Sign up
          </Link>


          {session?.user ? (
            <UserAccountNav user={session.user}>

            </UserAccountNav>
          ) : (
            <Link href="/sign-in" className={buttonVariants()}>
              Sign In
            </Link>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
