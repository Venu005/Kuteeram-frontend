import { ColumnDef } from "@tanstack/react-table";
import { Service } from "@/types";

export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => `$${row.getValue("price")}`,
  },
  {
    accessorKey: "createdBy.name",
    header: "Created By",
  },
];
