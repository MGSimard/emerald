import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from "sonner";
import { Nav } from "@/_components/Nav";
import { Footer } from "@/_components/Footer";

export const Route = createRootRoute({
  component: () => (
    <>
      <Nav />
      <Outlet />
      <Footer />
      <Toaster richColors toastOptions={{ className: "sonner-card" }} />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
