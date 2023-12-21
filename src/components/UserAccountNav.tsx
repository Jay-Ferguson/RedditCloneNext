import { FC } from "react";
import { User } from "next-auth";
import { DropdownMenu } from "./ui/DropDownMenu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import UserAvatar from "./UserAvatar";

interface UserAccountNavProps {
  user: Pick<User, "name" | "image" | "email">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            name: user.name || null,
            image: user.name || null,
          }}
        />
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default UserAccountNav;
