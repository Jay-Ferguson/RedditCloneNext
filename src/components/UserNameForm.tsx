"use client";

import { FC } from "react";
import { UserNameRequest, UserNameValidator } from "@/lib/validators/username";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { AxiosError } from "axios";
import { toast } from "./ui/use-toast";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/Card";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
interface UserNameFormProps {
  user: Pick<User, "id" | "username">;
}
type FormData = z.infer<typeof UserNameValidator>;
const UserNameForm: FC<UserNameFormProps> = ({ user }) => {
  const router = useRouter();
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

  const { mutate: updateUsername, isLoading } = useMutation({
    mutationFn: async ({ name }: FormData) => {
      const payload: FormData = { name };

      const { data } = await axios.patch(`/api/username/`, payload);
      return data;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Username already taken please select a different one.",
            description: "Please choose a different name.",
            variant: "destructive",
          });
        }
      }

      return toast({
        title: "There was an error.",
        description: "Could not create subreddit.",
        variant: "destructive",
      });
    },

    onSuccess: () => {
      toast({
        description: "Your username has been changed.",
      });
      router.refresh();
    },
  });

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <Card>
        <CardHeader>
          <CardTitle>Username</CardTitle>
          <CardDescription>Please enter a display name</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute top-0 left-0 w-8 h-10 grid place-items-center">
              <div className="text-sm text-zinc-400"></div>
            </div>

            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px] pl-6"
              size={32}
              {...register("name")}
            ></Input>
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button>Update</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default UserNameForm;
