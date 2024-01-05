"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { Session } from "next-auth";
import { FC } from "react";
import { Input } from "./ui/Input";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/Button";
import { ImageIcon } from "lucide-react";
import { Link2 } from "lucide-react";

interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <li className="overflow-hidden rounded-md bg-white">
        <div className="h-full px-6 py-4 flex justify-between gap-6">
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
          ></UserAvatar>
          <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outlone outline-2 outline-white" />
        </div>
        <Input
          readOnly
          onClick={() => router.push(pathname + "/submit")}
          placeholder="create post"
        />

        <Button
          onClick={() => router.push(pathname + "/submit")}
          variant="ghost"
        >
          <ImageIcon className="text-zinc-600"></ImageIcon>
        </Button>

        <Button
          onClick={() => router.push(pathname + "/submit")}
          variant="ghost"
        >
          <Link2 className="text-zinc-600"></Link2>
        </Button>
      </li>
      MiniCreatePost
    </>
  );
};

export default MiniCreatePost;
