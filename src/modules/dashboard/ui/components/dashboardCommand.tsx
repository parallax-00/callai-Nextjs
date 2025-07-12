"use client";
import { Dispatch, SetStateAction } from "react";

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";

interface ICommand {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardCommand = ({ open, setOpen }: ICommand) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a meeting or an agent" />
      <CommandList>
        <CommandItem>Test</CommandItem>
      </CommandList>
    </CommandDialog>
  );
};

export default DashboardCommand;
