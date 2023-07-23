import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";

const StoreAuthState = () => {
  // console.log("store auth state");
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const renew = JSON.parse(localStorage.getItem("keep"));

  useEffect(() => {
    let isMounted = true;
    const verifyAuth = async () => {
      setLoading(true);
      try {
        await refresh();
      } catch (err) {
        // console.log(err);
      } finally {
        isMounted && setLoading(false);
      }
    };

    if (!auth?.accessToken && renew) {
      // console.log("not authenticated");
      verifyAuth();
    } else {
      // console.log("already authenticated or no keep in localstoreage");
      setLoading(false);
    }
    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    // console.log(`isLoading: ${loading}`);
    // console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [loading]);

  return <>{loading ? <div>Loading...</div> : <Outlet />}</>;
};

export default StoreAuthState;
