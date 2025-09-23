  import { ResponsiveDialog } from "@/components/responsive-dialog";
  import { AgentForm } from "./agent-form";
  import { AgentGetOne } from "../../types";

  export interface UpdateAgentDialog {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    intialValues:AgentGetOne;
  }

  export const UpdateAgentDialog  = ({ open, onOpenChange,intialValues }: UpdateAgentDialog) => {
    return (
      <ResponsiveDialog
        title="Edit Agent"
        description="Edit the Agent Details"
        open={open}
        onOpenChange={onOpenChange}
        
      >
        <AgentForm onSuccess={()=>onOpenChange(false)} onCancel={()=>onOpenChange(false)}
          initialValues={intialValues}/>
      </ResponsiveDialog>
    );
  };
