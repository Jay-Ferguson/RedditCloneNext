import { getAuthSession } from "@/lib/auth";
import React from "react";

const Layout = async ({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const session = await getAuthSession();

  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-12">
      {children}
      <div className="">
        {/* button to take user back */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <div className="flex flex-col col-span-2 space-y-6">
            {children}

            {/* info sidebar */}

            <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
              <div className="px-6 py-4">
                <p className="semibold py-3">About r/ {``}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
