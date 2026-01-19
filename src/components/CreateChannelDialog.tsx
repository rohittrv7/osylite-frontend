import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateChannelMutation } from "@/store/api/ChannelApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";

interface ChannelRequest {
  name: string;
  handle: string;
  description?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateChannelDialog({ open, onClose }: Props) {
  const { register, handleSubmit, reset } = useForm<ChannelRequest>();

  const [createChannel] = useCreateChannelMutation();

  const onSubmit = async (data: ChannelRequest) => {
    try {
      await createChannel(data).unwrap();
      toast.success("Channel created successfully");
      reset();
      onClose();
    } catch (error) {
      apiErrorToastHandler(error);
      console.error("Failed to create channel", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Channel</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Channel Name"
            {...register("name", { required: true })}
          />

          <Input
            placeholder="@handle"
            {...register("handle", { required: true })}
          />

          <Textarea
            placeholder="Description (optional)"
            {...register("description")}
          />

          <Button type="submit" className="w-full">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
