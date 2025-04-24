import { useEffect, useState } from "react";
import { Service } from "@/types";
import { ServicesTable } from "@/components/services-table";
import { columns } from "./columns";
import { api } from "@/lib/axios";
import { AddServiceForm } from "@/components/add-service-form";

export default function AdminDashboard() {
  const [services, setServices] = useState<Service[]>([]);

  const fetchServices = async () => {
    try {
      const response = await api.get("/services");
      setServices(response.data);
    } catch (error) {
      console.error("Failed to fetch services", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className=" space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <AddServiceForm onSuccess={fetchServices} />
      <ServicesTable columns={columns} data={services} />
    </div>
  );
}
