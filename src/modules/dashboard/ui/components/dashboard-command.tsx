"use client";

import { Dispatch, SetStateAction } from "react";
import {
  CommandResponisveDialog,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
  return (
    <CommandResponisveDialog open={open} onOpenChange={setOpen}>
      {/* Required title for accessibility */}
      <VisuallyHidden>
        <h2 id="command-menu-title">Command Menu</h2>
      </VisuallyHidden>

      <CommandInput
        placeholder="Find a meeting or agent"
        aria-labelledby="command-menu-title"
      />

      <CommandList>
        <CommandItem>Tessst</CommandItem>
      </CommandList>
    </CommandResponisveDialog>
  );
};
