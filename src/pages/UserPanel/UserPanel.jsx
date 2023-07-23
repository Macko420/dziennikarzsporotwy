import React, { useEffect, useState } from "react";
import BackButton from "../../components/BackButton/BackButton";
import useAuth from "../../hooks/useAuth";
import useAuthRequest from "../../hooks/useAuthRequest";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const UserPanel = () => {
  const { auth } = useAuth();
  const [username, setUsername] = useState(auth?.user);
  const [email, setEmail] = useState(auth?.email);
  const [passShown, setPassShown] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [info, setInfo] = useState("");
  const AuthRequest = useAuthRequest();

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (passwords.newPassword) {
      setValidMatch(passwords.newPassword === passwords.confirmPassword);
    }
  }, [passwords.confirmPassword, passwords.newPassword]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const pwd = passwords?.currentPassword;
    const newPwd = passwords?.newPassword;
    if (!pwd || !newPwd) {
      setInfo("No data");
    }
    await AuthRequest.post(
      "/pass",
      JSON.stringify(
        { username, pwd, newPwd },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
    ).catch((err) => {
      console.log("err: ", err);
    });

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [id]: value,
    }));
  };

  return (
    <>
      <div className="bg-[#ADA8B6] w-full h-screen">
        <Header />
        <BackButton to="-1" />
        <div className="container p-4 flex justify-center flex-col ">
          <div className="row">
            <h1 className="text-2xl font-bold mb-4">Panel użytkownika</h1>
          </div>

          <div className="row mb-6">
            <h2 className="col-lg-2 text-xl mb-2">Twoje dane:</h2>
            <span className="col-md-3">
              <b>Nazwa użytkownika:</b> {username}
            </span>
            <span className="col-md-3">
              <b>Adres e-mail:</b> {email}
            </span>
          </div>
          <div className="row">
            <h1 className="text-2xl font-bold my-4">Zmień hasło</h1>
            <form onSubmit={handlePasswordChange} className="w-64">
              <div className="mb-4">
                <label
                  htmlFor="currentPassword"
                  className="block mb-2 font-medium "
                >
                  Obecne hasło
                </label>
                <input
                  type={passShown ? "text" : "password"}
                  id="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-[1px] border-[#291711] rounded bg-slate-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block mb-2 font-medium">
                  Nowe hasło
                </label>
                <input
                  type={passShown ? "text" : "password"}
                  id="newPassword"
                  value={passwords.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-[1px] border-[#291711] rounded bg-slate-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 font-medium"
                >
                  Potwierdź nowe hasło
                </label>
                <input
                  type={passShown ? "text" : "password"}
                  id="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-[1px] border-[#291711] rounded bg-slate-200"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setPassShown(!passShown);
                }}
                className="bg-[#291711] text-white py-2 px-10 mb-4 w-100 rounded font-bold transition-colors duration-300 hover:bg-[#90513C] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
              >
                Show password
              </button>
              <button
                type="submit"
                className="w-full py-2 font-medium bg-[#291711] text-white rounded shadow hover:bg-[#90513C] hover:text-gray-800 disabled:opacity-50 disabled:hover:bg-[#291711]"
                disabled={!validMatch}
              >
                Zmień hasło
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserPanel;
