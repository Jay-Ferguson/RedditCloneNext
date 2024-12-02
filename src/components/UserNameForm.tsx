"use client";

import { FC } from "react";
import { UserNameRequest, UserNameValidator } from "@/lib/validators/username";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { Card, CardHeader, CardDescription, CardTitle } from "./ui/card";
interface UserNameFormProps {
  user: Pick<User, "id" | "username">;
}

const UserNameForm: FC<UserNameFormProps> = ({ user }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserNameRequest>({
    resolver: zodResolver(UserNameValidator),
    defaultValues: {
      name: user?.username || "",
    },
  });
  return (
    <form onSubmit={handleSubmit(() => {

    })}>
      <Card>
        <CardHeader>
          <CardTitle>Username</CardTitle>
          <CardDescription>
            Please enter a display name
          </CardDescription>
          <CardHeader>
            <div className="relative grid gap-1">
              <div className="absolute"></div>
            </div>
          </CardHeader>
        </CardHeader>
      </Card>
    </form>
  );
};

export default UserNameForm;
