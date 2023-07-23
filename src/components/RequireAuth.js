import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const RequireAuth = () => {
  const { auth } = useAuth();

  if (auth?.accessToken) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default RequireAuth;
