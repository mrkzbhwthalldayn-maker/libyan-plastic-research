"use client";
import { toast } from "@/hooks/use-toast";
import React from "react";
import { Button } from "./ui/button";
import { FaShare } from "react-icons/fa";
import { useParams } from "next/navigation";

function ShareDialog({ title, url }: { title: string; url: string }) {
  const { lang } = useParams();
  const openMobileShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title,
          url,
        })
        .then(() => console.log("Content shared successfully"))
        .catch((error) => console.log("Error sharing content:", error));
    } else {
      // Copy title and URL to clipboard when Web Share API is not supported
      const content = `${title} - ${url}`;
      navigator.clipboard
        .writeText(content)
        .then(() => {
          console.log("Content copied to clipboard!");
          toast({ title: "Content copied to clipboard!" });
        })
        .catch((error) => {
          console.error("Error copying content to clipboard:", error);
          toast({ title: "Failed to copy content." });
        });
    }
  };

  return (
    <div>
      <Button onClick={openMobileShare} className="my-2">
        {lang === "en" ? "Share" : "مشاركة"}
        <FaShare />
      </Button>
    </div>
  );
}

export default ShareDialog;
