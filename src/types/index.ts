export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  createdBy: User;
}

export interface Booking {
  _id: string;
  user: User;
  service: Service;
  status: "pending" | "confirmed" | "completed";
}
