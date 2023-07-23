import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-[rgb(33,37,41)] text-white pt-3">
      <div className="container-md">
        <div className="row">
          {/* Column 1 */}
          <div className="col-sm">
            <h4>Linki</h4>
            <ul className="list-unstyled">
              <Link to="/">Home</Link>
              {/* <li>
                <a href="/aboutus">About Us</a>
              </li> */}
              {/* <li>
                <a href="/contactus">Contact Us</a>
              </li> */}
            </ul>
          </div>
          {/* Column 2 */}
          <div className="col-sm">
            <h4>Zaobserwuj nas</h4>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com">
                <FontAwesomeIcon icon={faFacebook} size="2xl" />
              </a>
              <a href="https://twitter.com">
                <FontAwesomeIcon icon={faTwitter} size="2xl" />
              </a>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Dziennikarz Sportowy | All rights
            reserved
          </p>
          <p>
            Made with <FontAwesomeIcon icon={faHeart} /> by{" "}
            <a href="https://maciekk.me" className="text-white">
              Maciekk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
