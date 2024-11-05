"use client"

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";

export default function Home() {

  const {user} = useUser();
  const createUser = useMutation(api.user.createUser)


  useEffect(() => {
    user && checkUser();
  }, [user])
  

  const checkUser = async () => {
    const result = await createUser({
      userName:user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl
    });
    console.log(result);
  }

  return (
    <div>
      <h1>Swadhin&Dhara</h1>
      <Button>Home</Button>
      <UserButton />
    </div>
  );
}
