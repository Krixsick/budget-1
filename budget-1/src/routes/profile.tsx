import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { Button } from "../Components/ui/button";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(true);

  // If already signed in, redirect to home
  if (isSignedIn) {
    navigate({ to: "/" });
    return null;
  }

  return (
    <>
      <div className="w-full h-[100vh] flex flex-col justify-center items-center">
        <h1 className="my-4">budget-1</h1>
        {showSignUp ? <SignUp></SignUp> : <SignIn></SignIn>}
        <Button
          className="m-4 cursor-pointer"
          onClick={() => setShowSignUp(!showSignUp)}
          variant="ghost"
        >
          {showSignUp
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </Button>
      </div>
    </>
  );
}
