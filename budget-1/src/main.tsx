import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "../theme.css";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { ClerkProvider } from "@clerk/clerk-react";

// Create a new router instance
const router = createRouter({ routeTree });
const queryClient = new QueryClient();
// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <RouterProvider router={router} />
        </ClerkProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
