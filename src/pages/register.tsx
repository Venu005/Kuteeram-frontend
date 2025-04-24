import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/axios";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post("/auth/register", data);
      login(response.data.user);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error("Registration failed");
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-96 space-y-6">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input {...register("name", { required: "Name is required" })} />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
        </div>
        <div className="space-y-2">
          <Label>Password</Label>
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
          />
        </div>
        <Button type="submit" className="w-full cursor-pointer">
          Register
        </Button>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
}
