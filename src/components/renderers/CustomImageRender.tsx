"use client";
import { FaClosedCaptioning } from "react-icons/fa";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;
  const caption = data.caption;

  return (
    <>
      <div className="relative mt-3 w-full min-h-[21rem] group">
        <Image alt="image" className="object-contain" fill src={src} />
      </div>
      {caption.length >= 1 && (
        <div className="h-fit w-full flex items-center justify-start ml-2 mt-1">
          <Popover>
            <PopoverTrigger asChild>
            <Button variant={'ghost'} size={'lg'} > <FaClosedCaptioning  className="text-2xl text-[#3d70b2]" /> </Button>

            </PopoverTrigger>
            <PopoverContent>{caption}</PopoverContent>
          </Popover>
        </div>
        
      )}
    </>
  );
}

export default CustomImageRenderer;
