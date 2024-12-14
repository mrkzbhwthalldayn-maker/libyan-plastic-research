import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface Props {
  fullName: string;
  role: string;
}

const Profile = ({ fullName, role }: Props) => {
  return (
    <div className="flex-between-row gap-3">
      <Button variant={"ghost"} size={"icon"}>
        <Info fontSize={"12px"} />
      </Button>
      <div className="flex-center-col gap-2">
        <h3 className=" font-semibold text-lg">{fullName}</h3>
        <div>{role}</div>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Profile;
