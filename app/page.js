"use client"
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";
import ChatInputbox from "./_compomonents/ChatInputbox";

export default function Home() {
  const{setTheme}=useTheme();
  return (
    <div>
    <ChatInputbox/>
    </div>

  );
}

