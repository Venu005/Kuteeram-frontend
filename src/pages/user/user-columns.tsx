import { ColumnDef } from "@tanstack/react-table";
import { Booking, Service } from "@/types";
import { Button } from "@/components/ui/button";
import { SortHeader } from "@/components/sort-header";

export const columns = (
  setService: (service: Service) => void
): ColumnDef<Service>[] => [
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
    header: ({ column }) => <SortHeader column={column} title="Price" />,
    cell: ({ row }) => `$${row.getValue("price")}`,
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button onClick={() => setService(row.original)} className="cursor-pointer" >Book Now</Button>
    ),
  },
];

export const bookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: "service.title",
    header: "Service",
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusClass = (status: string) => {
        switch (status.toLowerCase()) {
          case "completed":
            return "bg-green-100 text-green-800";
          case "pending":
            return "bg-yellow-100 text-yellow-800";
          case "confirmed":
            return "bg-blue-100 text-blue-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };

      return (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
            status
          )}`}
        >
          <span className="capitalize">{status}</span>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortHeader column={column} title="Booked At" />,
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
    enableSorting: true,
  },
];
