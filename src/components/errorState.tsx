// "use client";

import { AlertTriangleIcon } from "lucide-react";

interface Iloader {
  title: string;
  description: string;
}
export const ErrorState = ({ title, description }: Iloader) => {
  return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-6 shadow-sm">
        <AlertTriangleIcon className="size-6 text-red-600" />
        <div>
          <h6 className="text-lg font-medium"> {title} </h6>
          <p className="text-sm"> {description} </p>
        </div>
      </div>
    </div>
  );
};
