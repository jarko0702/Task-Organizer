import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Login from "./pages/Login";

function AuthCheck() {
  const [user, loading, error] = useAuthState(auth);

  if (loading)
    return (
      <>
        <Loading />
      </>
    );
  if (!user)
    return (
      <>
        <Login />
      </>
    );

  if (user)
    return (
      <>
        <Home />
      </>
    );

  if (error) return <h1>There was a Error</h1>;
}

export default AuthCheck;
