import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import { axiosAuth } from "../api/axios";

const useAuthRequest = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosAuth.interceptors.request.use(
      function (config) {
        if (!config?.headers?.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      function (error) {
        console.log("eror in request interceptor: ", error);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosAuth.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        const prevReq = error?.config;
        if (error?.response.status === 403 && !prevReq?.sent) {
          console.log("do refresh");
          prevReq.sent = true;
          const newAccessToken = await refresh();
          prevReq.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosAuth(prevReq);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestInterceptor);
      axiosAuth.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return axiosAuth;
};

export default useAuthRequest;
