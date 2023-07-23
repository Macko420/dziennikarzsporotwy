import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        user: response.data.userName,
        accessToken: response.data.accessToken,
        email: response.data.email,
      };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
