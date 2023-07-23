import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    localStorage.removeItem("keep");
    await axios.get("/logout", {
      withCredentials: true,
    });
  };

  return logout;
};

export default useLogout;
