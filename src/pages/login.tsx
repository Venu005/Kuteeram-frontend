import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/axios";
import { useAuth } from "@/contexts/auth";
import { Link, useNavigate } from "react-router-dom"; // Import Link

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post("/auth/login", data);
      login(response.data.user);
      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-96 space-y-6">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input {...register("email")} type="email" required />
        </div>
        <div className="space-y-2">
          <Label>Password</Label>
          <Input {...register("password")} type="password" required />
        </div>
        <Button type="submit" className="w-full cursor-pointer">
          Login
        </Button>
        {/* Add the Sign up link here */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
