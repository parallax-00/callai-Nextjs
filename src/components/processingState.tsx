"use client";

import { EmptyState } from "./emptyState";

export const ProcessingState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col items-center justify-center">
      <EmptyState
        image="/processing.svg"
        title="Meeting completed."
        description="This meeting was completed, a summary will appear soon."
      />
    </div>
  );
};
