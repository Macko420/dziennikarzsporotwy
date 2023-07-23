import { useState, useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

function Main() {
  const { auth } = useAuth();
  const logout = useLogout();
  const location = useLocation();
  const expand = "md";
  const navigate = useNavigate();

  const inputElement = useRef(null);

  const parentRef = useRef(null);
  const [parentWidth, setParentWidth] = useState(0);

  const [searchInput, setSearchInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchInput) {
      setIsFocused(false);
      navigate(`/search?n=${searchInput}`);
    }
    setSearchInput("");
  };

  useEffect(() => {
    if (isFocused) {
      inputElement.current.focus();
    } else {
      inputElement.current.blur();
    }
  }, [isFocused]);

  useEffect(() => {
    const handleResize = () => {
      if (parentRef.current) {
        setParentWidth(parentRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Pobranie szerokości początkowej

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Navbar className="bg-[#212529]" variant="dark" expand="md">
        <Container className="h-12" ref={parentRef}>
          <Navbar.Brand
            as={Link}
            to="/"
            className="flex-shrink-0 flex items-center justify-center ml-2"
          >
            Dziennikarz Sportowy
          </Navbar.Brand>

          <div className="flex relative">
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="text-bg-dark w-5"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Dziennikarz Sportowy
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="ml-auto mr-10 justify-content-end flex-grow-1">
                  {/* socials */}
                  <Nav.Link href="https://twitter.com" target="_blank">
                    <FontAwesomeIcon icon={faTwitter} /> Twitter
                  </Nav.Link>
                  <Nav.Link href="https://www.facebook.com" target="_blank">
                    <FontAwesomeIcon icon={faFacebook} /> Facebook
                  </Nav.Link>
                  {/* auth */}
                  {auth?.accessToken === undefined ? (
                    <>
                      <Nav.Link
                        as={NavLink}
                        to="/login"
                        state={{ prevUrl: location.pathname }}
                        className="text-white no-underline"
                      >
                        Login
                      </Nav.Link>
                      <Nav.Link
                        as={NavLink}
                        to="/register"
                        state={{ prevUrl: location.pathname }}
                        className="text-white no-underline"
                      >
                        Sign up
                      </Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link
                        as={NavLink}
                        to="/userpanel"
                        state={{ prevUrl: location.pathname }}
                        className="text-white no-underline"
                      >
                        Panel
                      </Nav.Link>
                      <Nav.Link
                        as={NavLink}
                        onClick={(e) => {
                          logout();
                        }}
                        className="text-white no-underline"
                      >
                        Logout
                      </Nav.Link>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>

            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              className="mr-[50px]"
            />
            {/* search */}
            <div
              className={`absolute inset-y-0 transition-width duration-[700ms] ease-in-out ${
                isFocused
                  ? `w-full right-0 max-md:w-full max-md:mx-2`
                  : "w-10 h-10 right-0"
              }`}
            >
              <button
                onClick={() => {
                  setIsFocused(!isFocused);
                  if (isFocused) {
                    inputElement.current.blur();
                  }
                }}
                className="absolute inset-y-0 right-0 flex justify-center items-center hover:cursor-pointer w-10 h-10"
              >
                {isFocused ? (
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{ color: "#888b91" }}
                    size="xl"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ color: "#888b91" }}
                  />
                )}
              </button>
              <input
                ref={inputElement}
                type="text"
                name="search"
                value={searchInput}
                onChange={handleSearchInput}
                placeholder={isFocused ? "Search..." : ""}
                className={`mr-2 bg-gray-800 text-white rounded-full cursor-pointer ${
                  isFocused
                    ? "pl-4 py-2 h-10 w-full cursor-text outline-none ring-2"
                    : "w-10 h-10 hidden"
                } focus:ring-blue-500 focus:bg-gray-700`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit(e);
                  }
                }}
              />
            </div>
          </div>
        </Container>
      </Navbar>
      <div className="flex items-center justify-center">
        <div className="w-100 h-0.5 bg-black relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="font-serif w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold">
              <Link to="/" className="no-underline text-white">
                DS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
