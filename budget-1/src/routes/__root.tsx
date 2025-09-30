import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Navbar } from "../Components/navbar";
import { MonthProvider } from "../Components/home/dates";
const RootLayout = () => (
  <>
    <Navbar></Navbar>
    <MonthProvider></MonthProvider>
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
