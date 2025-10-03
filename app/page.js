"use client"
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Home() {
  const{setTheme}=useTheme();
  return (
    <div><h1>HEllo my girl</h1>
    <Button>Subscribe</Button>
    <Button onClick={()=>setTheme('dark')}>Dark mode</Button>
      <Button onClick={()=>setTheme('light')}>Light mode</Button>
    </div>

  );
}

