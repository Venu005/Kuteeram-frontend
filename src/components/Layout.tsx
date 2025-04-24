import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 p-8 mt-5">
        {" "}
        {/* Add padding to account for fixed navbar */}
        <Outlet />
      </main>
    </div>
  );
}
