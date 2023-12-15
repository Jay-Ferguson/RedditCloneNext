import { FC } from "react";
import { User } from "next-auth";
import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface UserAvatarProps {
  user: Pick<User, "name" | "image">;
}

const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
  return (
    <Avatar>
      {user.image ? (
        <div className="relative">
          <Image
            fill
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback></AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
