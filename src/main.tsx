import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { ThemeContextProvider } from "@/_components/ThemeContext";
import { LangContextProvider } from "@/_components/LangContext";
import { Error, NotFound } from "@/_components/NotFoundError";
import "@/_styles/global.css";
import "@/_styles/fonts.css";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: Error,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeContextProvider>
        <LangContextProvider>
          <RouterProvider router={router} />
        </LangContextProvider>
      </ThemeContextProvider>
    </StrictMode>
  );
}
