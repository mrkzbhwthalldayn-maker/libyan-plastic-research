"use client";
import React, { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa"; // You can use any icon library like react-icons
import { Button } from "./ui/button";
import { useParams } from "next/navigation";

interface CopyToClipboardProps {
  content: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ content }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { lang } = useParams();
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);

      // Reset the icon after 2-3 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Error copying to clipboard", error);
    }
  };

  return (
    <Button
      variant={"default"}
      onClick={copyToClipboard}
      className="flex items-center text-white space-x-2 p-2 border rounded-lg"
    >
      {isCopied ? (
        <FaCheck className="text-green-500" />
      ) : (
        <FaCopy className="text-white" />
      )}
      <span>
        {isCopied
          ? lang === "en"
            ? "Copied!"
            : "تم النسخ!"
          : lang === "en"
          ? "Copy URL"
          : "نسخ الرابط"}
      </span>
    </Button>
  );
};

export default CopyToClipboard;
