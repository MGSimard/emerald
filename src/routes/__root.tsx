import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Nav } from "@/_components/Nav";
import { Footer } from "@/_components/Footer";

export const Route = createRootRoute({
  component: () => (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster
        richColors
        toastOptions={{
          className: "sonner-card",
          style: {
            fontFamily: "var(--GeistMono-and-fallbacks)",
            backgroundColor: "var(--clrBg)",
            border: "1px solid var(--clrBorder)",
            borderRadius: "0.4rem",
          },
        }}
      />
    </>
  ),
});
