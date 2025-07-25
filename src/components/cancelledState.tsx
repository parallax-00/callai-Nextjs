"use client";
import { EmptyState } from "./emptyState";

export const CancelledState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col items-center justify-center">
      <EmptyState
        image="/cancelled.svg"
        title="Meeting cancelled."
        description="This meeting was cancelled."
      />
    </div>
  );
};
