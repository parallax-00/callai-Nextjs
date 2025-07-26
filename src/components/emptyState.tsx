// "use client";

import Image from "next/image";

interface Iloader {
  title: string;
  description: string;
  image?: string;
}
export const EmptyState = ({
  title,
  description,
  image = "/empty.svg",
}: Iloader) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={image} alt="Empty" width={240} height={240} />
      <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
        <p className="text-lg font-medium"> {title} </p>
        <p className="text-sm text-muted-foreground"> {description} </p>
      </div>
    </div>
  );
};
