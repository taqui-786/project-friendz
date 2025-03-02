"use client";
import { cn } from "@/lib/utils";
import React from "react";

function CustomListRenderer({ data }: any) {
  return <div>{data.items.map((item: string, idx: number) => (
    <li key={idx} className={cn({
        'list-decimal pl-4 ml-6': data.style === 'ordered',
        'list-disc pl-4 ml-6': data.style === 'unordered',
      })}
    >
      {item}
    </li>
  ))}</div>;
}

export default CustomListRenderer;
