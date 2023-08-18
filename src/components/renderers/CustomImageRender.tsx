"use client";

import Image from "next/image";

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;
  const caption = data.caption;
  // console.log(data);

  return (
    <>
      <div className="relative mt-3 w-full min-h-[21rem] group">
        <Image alt="image" className="object-contain" fill src={src} />
      </div>
      {caption.length >= 1 && (
        <div className="h-fit w-full flex items-center justify-center mt-1">
          <h2 className="text-sm block font-semibold ml-5 border border-borderE3 p-2 w-fit font-mono">
            Captions: {caption}
          </h2>
        </div>
      )}
    </>
  );
}

export default CustomImageRenderer;
