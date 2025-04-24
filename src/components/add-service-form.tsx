import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/axios";
import { Service } from "@/types";

interface AddServiceFormProps {
  onSuccess: () => void;
}
export function AddServiceForm({ onSuccess }: AddServiceFormProps) {
  const { register, handleSubmit, reset } =
    useForm<Omit<Service, "_id" | "createdBy">>();

  const onSubmit = async (data: Omit<Service, "_id" | "createdBy">) => {
    try {
      await api.post("/services", data);
      reset();
      onSuccess();
    } catch (error) {
      console.error("Failed to create service", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-6 border rounded-lg"
    >
      <div className="space-y-2">
        <Label>Service Title</Label>
        <Input {...register("title")} required />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Input {...register("description")} required />
      </div>
      <div className="space-y-2">
        <Label>Price</Label>
        <Input {...register("price")} type="number" required />
      </div>
      <Button type="submit" className="cursor-pointer">
        Add Service
      </Button>
    </form>
  );
}
