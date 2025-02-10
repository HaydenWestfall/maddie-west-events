import "./contact-section.scss";
import { mweNavigate } from "../utility";

const ContactSection: React.FC<{ handleNavigation: (path: string) => void }> = ({ handleNavigation }) => {
  return (
    <div className="contact-section">
      <div className="header-wrapper">
        <div className="image-wrapper">
          <img loading="lazy" src="/contact/maddie_client.webp" id="image-1" />
          <img loading="lazy" src="/contact/maddie_phone.webp" id="image-2" />
          <span>
            FOLLOW
            <a target="_blank" href="https://www.instagram.com/maddiewestevents/">
              @MADDIEWEST
            </a>
            <br />
            ON INSTAGRAM
          </span>
        </div>
      </div>
      <div className="contact-info-wrapper">
        <div className="client-quote">
          <div id="client-quote" className="quote">
            "... I relied on her ENTIRELY on the day of and let her do her thing in various aspects of decor and trusted
            fully that she would make everything perfect so that I WOULDNT HAVE TO WORRY ABOUT ANYTHING."
          </div>
          <div className="client">SARAH VOGE | CLIENT</div>
        </div>

        <a
          href="/contact"
          className="primary-button medium light"
          onClick={(e: any) => mweNavigate(e, handleNavigation, "/contact")}
        >
          GET IN TOUCH
        </a>
      </div>
    </div>
  );
};

export default ContactSection;
