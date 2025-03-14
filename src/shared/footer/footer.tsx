import { mweNavigate } from "../utility";
import "./footer.scss";

const FooterSection: React.FC<{ handleNavigation: (path: string) => void }> = ({ handleNavigation }) => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="footer">
      <div className="logo-contact">
        <img src="/logo/maddie_west_logo.png" />
      </div>
      <div className="footer-wrapper">
        <div className="links-wrapper">
          <a id="test" href="./index" onClick={(e: any) => mweNavigate(e, handleNavigation, "/")}>
            HOME
          </a>
          <a href="/about" onClick={(e: any) => mweNavigate(e, handleNavigation, "/about")}>
            ABOUT
          </a>
          <a href="/testimonies" onClick={(e: any) => mweNavigate(e, handleNavigation, "/testimonies")}>
            TESTIMONIES
          </a>
          <a href="/packages" onClick={(e: any) => mweNavigate(e, handleNavigation, "/packages")}>
            PACKAGES
          </a>
          <a href="/journal" onClick={(e: any) => mweNavigate(e, handleNavigation, "/journal")}>
            JOURNAL
          </a>
          <a href="/contact" onClick={(e: any) => mweNavigate(e, handleNavigation, "/contact")}>
            CONTACT
          </a>
        </div>
        <a className="instagram-link" href="https://www.instagram.com/maddiewestevents/" target="_blank">
          INSTAGRAM
        </a>
      </div>

      <div className="copyright-wrapper">
        <div className="copyright">
          <span className="copyright-text">© Maddie West Events 2024 | Site Designed by Hayden Westfall</span>
        </div>
        <button className="back-to-top" onClick={scrollTop}>
          Back to Top
          <svg width="22" height="22" viewBox="0 0 22 23" fill="none">
            <path
              d="M17.6738 10.6115C17.61 10.6754 17.5341 10.7261 17.4507 10.7607C17.3672 10.7953 17.2777 10.8131 17.1874 10.8131C17.097 10.8131
                        17.0076 10.7953 16.9241 10.7607C16.8407 10.7261 16.7648 10.6754 16.701 10.6115L11.6874 5.59701V19.0626C11.6874 19.2449 11.615 19.4198 11.486
                        19.5487C11.3571 19.6776 11.1822 19.7501 10.9999 19.7501C10.8176 19.7501 10.6427 19.6776 10.5138 19.5487C10.3848 19.4198 10.3124 19.2449 10.3124
                        19.0626V5.59701L5.2988 10.6115C5.1698 10.7405 4.99483 10.8129 4.81239 10.8129C4.62996 10.8129 4.45499 10.7405 4.32599 10.6115C4.19698 10.4825
                        4.12451 10.3075 4.12451 10.1251C4.12451 9.94262 4.19698 9.76765 4.32599 9.63865L10.5135 3.45115C10.5773 3.38722 10.6532 3.33652 10.7366
                        3.30192C10.8201 3.26732 10.9095 3.24951 10.9999 3.24951C11.0902 3.24951 11.1797 3.26732 11.2632 3.30192C11.3466 3.33652 11.4225 3.38722 11.4863
                        3.45115L17.6738 9.63865C17.7377 9.7025 17.7884 9.77832 17.823 9.86178C17.8576 9.94524 17.8754 10.0347 17.8754 10.1251C17.8754 10.2154 17.8576
                        10.3049 17.823 10.3883C17.7884 10.4718 17.7377 10.5476 17.6738 10.6115Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FooterSection;
