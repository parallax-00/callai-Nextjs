"use client";

import { Loader2Icon } from "lucide-react";

interface Iloader {
  title: string;
  description: string;
}
export const LoadingState = ({ title, description }: Iloader) => {
  return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-6 shadow-sm">
        <Loader2Icon className="size-6 animate-spin text-primary" />
        <div>
          <p className="text-lg font-medium"> {title} </p>
          <p className="text-sm"> {description} </p>
        </div>
      </div>
    </div>
  );
};
