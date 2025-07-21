"use client";
import { useState } from "react";
import { PlusIcon, XCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import NewAgentDialog from "./newAgentDialog";
import { useAgentsFilters } from "../../hooks/useAgentsFilter";
import { AgentsSearchFilter } from "./agentsSearchFilter";
import { DEFAULT_PAGE } from "@/constants";

const AgentsListHeader = () => {
  const [filters, setFilters] = useAgentsFilters();
  const [isOpen, setIsOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

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
        <div className="flex items-center gap-x-2 p-1">
          <AgentsSearchFilter />
          {isAnyFilterModified && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <XCircleIcon />
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default AgentsListHeader;
