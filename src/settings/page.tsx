
export const metadata = {
  title: "settings",
  description: "manage your account and settings",
};

import { FC } from "react";
import { authOptions, getAuthSession } from "@/lib/auth";
import UserNameForm from "../components/UserNameForm";
import { redirect } from "next/navigation";
interface pageProps {}

const page = async ({}) => {
  const session = await getAuthSession();
  if(!session?.user){
     redirect(authOptions.pages?.signIn || '/sign-in/')
  }
  return <div className="max-w-4xl mx-auto py-12">page
  <div className="grid itesm-start gap-8">
     <h1 className="font-bold" text-3xl md:text-4xl>
          <div className="grid gap-10">
               <UserNameForm />
          </div>
     </h1>
  </div>
  </div>;
};

export default page;
