import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white text-black p-4 flex justify-between items-center fixed w-full top-0 z-10 border-b">
      <h1 className="text-xl font-bold">Service Booking System</h1>
      <Button
        variant={"ghost"}
        onClick={handleLogout}
        className="cursor-pointer"
      >
        Logout
      </Button>
    </nav>
  );
}
