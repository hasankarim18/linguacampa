import { Link } from "react-router-dom";
import { FaEnvelope, FaMailBulk, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
    return (
      <div>
        <footer className="grid grid-cols-1 md:grid-cols-4 gap-4 justify-between dark:border-t-2 p-10 bg-darkNavyBlue text-white siteContainer">
          <div>
            <Link to="/">
              <img src="/public/4.png" alt="" />
            </Link>
            <p>
              LinguaCampa
              <br />
              Teaching Foreign Language since 1992
            </p>
          </div>
          <div>
            <div className="footer-title">Address</div>
            <span>
              LinguaCampa <br /> 456 Demo Avenue <br /> City: Demo City
              <br /> State: Demo <br />
              State ZIP Code: 67890 <br /> Country: DemoLand
            </span>
          </div>
          <div>
            <div className="footer-title">UseFul Links</div>
            <div className="link link-hover">About us</div>

            <div className="link link-hover">Jobs</div>
            <div className="link link-hover">Privacy policy</div>
            <div className="link link-hover">Cookie policy</div>
          </div>
          <div>
            <div className="footer-title">Contact Us</div>
            <div className="link link-hover flex gap-1 items-center">
              <FaPhoneAlt /> +99 01010101{" "}
            </div>
            <div className="link link-hover flex gap-1 items-center">
              <FaEnvelope /> admin@linguacampa.com{" "}
            </div>
            <div className="link link-hover flex gap-1 items-center">
              <FaMailBulk />   Contact
            </div>
          </div>
        </footer>
        <div className="siteContainer bg-darkNavyBlue text-white text-center pb-4">
          All Rights Reserved &copy;LinguaCampa
        </div>
      </div>
    );
};

export default Footer;