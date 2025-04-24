import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Service } from "@/types";

interface BookingDialogProps {
  service: Service | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function BookingDialog({
  service,
  onOpenChange,
  onConfirm,
}: BookingDialogProps) {
  return (
    <Dialog open={!!service} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Booking</DialogTitle>
          <DialogDescription>
            Please review the service details before confirming
          </DialogDescription>
        </DialogHeader>

        {service && (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">{service.title}</h3>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Price:</span>
              <span>${service.price}</span>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} className="cursor-pointer">
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
