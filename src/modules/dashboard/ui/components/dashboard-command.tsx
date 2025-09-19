import { Dispatch, SetStateAction } from "react";
import { CommandDialog, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      {/* Required title for accessibility */}
      <VisuallyHidden>
        <DialogTitle>Command Menu</DialogTitle>
      </VisuallyHidden>

      <CommandInput placeholder="Find a meeting or agent" />
      <CommandList>
        <CommandItem>Test</CommandItem>
      </CommandList>
    </CommandDialog>
  );
};
