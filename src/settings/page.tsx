export const metadata = {
  title: "settings",
  description: "manage your account and settings",
};

import { FC } from "react";
import { getAuthSession } from "@/lib/auth";
interface pageProps {}

const page = async ({}) => {
  const session = await getAuthSession();
  return <div>page</div>;
};

export default page;
