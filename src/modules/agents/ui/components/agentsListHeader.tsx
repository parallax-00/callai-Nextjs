"use client";
import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import NewAgentDialog from "./newAgentDialog";

const AgentsListHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <NewAgentDialog open={isOpen} onOpenChange={setIsOpen} />
      <div className="py-4 px-8 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My Agents</h5>
          <Button onClick={() => setIsOpen(true)}>
            <PlusIcon /> New Agent
          </Button>
        </div>
      </div>
    </>
  );
};

export default AgentsListHeader;
