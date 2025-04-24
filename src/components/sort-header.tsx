import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SortHeader = ({
  column,
  title,
}: {
  column: any;
  title: string;
}) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    className="px-0 cursor-pointer"
  >
    {title}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);
