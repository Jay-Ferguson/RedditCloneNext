'use client'

import { FC } from "react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {signIn} from "next-auth/react";
import { Icons } from "./Icons";
import { useToast } from "./ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({className, ...props}) => {

     const [isLoading, setIsLoading] = useState<boolean>(false)
     const {toast} = useToast()

     const loginWithGoogle = async () => {
          setIsLoading(true)
          try {
               throw new Error
               await signIn('google')
          } catch(error) {
                    toast({
                         title: 'there was a problem',
                         description:'there was an error',
                         variant:"destructive"
                    })
          } finally {
               setIsLoading(false)
          }
     }
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button size='sm' className="full" onClick={loginWithGoogle} isLoading={isLoading}>
          {isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
      </Button>
      Google
    </div>
  );
};

export default UserAuthForm;
