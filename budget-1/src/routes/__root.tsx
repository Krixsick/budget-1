import {
  createRootRoute,
  Link,
  Navigate,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Navbar } from "../Components/navbar";
import { useAuth } from "@clerk/clerk-react";
import { FourSquare } from "react-loading-indicators";
const RootLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();

  // Show loading while Clerk checks auth status
  if (!isLoaded) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <FourSquare color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>
    );
  }

  const isProfileRoute = location.pathname === "/profile";
  // If not signed in and NOT on profile page, redirect to login
  if (!isSignedIn && !isProfileRoute) {
    return <Navigate to="/profile" />;
  }
  return (
    <>
      {isSignedIn ? (
        <>
          (<Navbar></Navbar>
          <Outlet />
          <TanStackRouterDevtools />)
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });
