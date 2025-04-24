import { useEffect, useState } from "react";
import { Service, Booking } from "@/types";
import { ServicesTable } from "@/components/services-table";
import { bookingColumns, columns } from "./user-columns";
import { api } from "@/lib/axios";
import { BookingDialog } from "@/components/booking-dialog";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserDashboard() {
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredBookings = bookings.filter((booking) =>
    statusFilter === "all" ? true : booking.status === statusFilter
  );
  const fetchData = async () => {
    try {
      const [servicesRes, bookingsRes] = await Promise.all([
        api.get("/services"),
        api.get("/bookings"),
      ]);
      setServices(servicesRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBooking = async () => {
    if (!selectedService) return;

    try {
      // Create optimistic booking with full service details
      const optimisticBooking = {
        _id: Date.now().toString(), // Temporary ID
        service: {
          _id: selectedService._id,
          title: selectedService.title,
          description: selectedService.description,
          price: selectedService.price,
          createdBy: selectedService.createdBy,
        },
        status: "pending" as const,
        createdAt: new Date().toISOString(),
        user: {
          _id: "temp-user",
          name: "Loading...",
          email: "temp",
          role: "user",
        }, // Temporary user data
      };

      // Immediate optimistic update
      setBookings((prev) => [...prev, optimisticBooking as Booking]);
      toast("Booking Successful");

      // Make actual API call
      const response = await api.post("/bookings", {
        serviceId: selectedService._id,
      });
      console.log(response);
      // Update with real data after 5 seconds
      setTimeout(async () => {
        const { data } = await api.get("/bookings");
        setBookings(data);
      }, 10000);
    } catch (error: unknown) {
      // Remove optimistic booking on error
      console.log(error);
      toast.error("Booking Failed");
    } finally {
      setSelectedService(null);
    }
  };

  return (
    <div className=" space-y-8">
      <h1 className="text-3xl font-bold">Available Services</h1>
      <ServicesTable columns={columns(setSelectedService)} data={services} />

      <h2 className="text-2xl font-bold mt-12">Your Bookings</h2>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Bookings</h2>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ServicesTable columns={bookingColumns} data={filteredBookings} />

      <BookingDialog
        service={selectedService}
        onOpenChange={() => setSelectedService(null)}
        onConfirm={handleBooking}
      />
    </div>
  );
}
