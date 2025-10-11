import { useEffect, useRef } from "react";
import { mweNavigate, TransitionState } from "../utility";
import "./header.scss";
import gsap from "gsap";
import { useMWETransitionContext } from "../route-transition/TransitionProvider";
import { env } from "../../config/env";

const HeaderSection: React.FC<{ handleNavigation: (path: string) => void }> = ({ handleNavigation }) => {
  const { isTransitioning } = useMWETransitionContext();
  const mobileMenuButton = useRef<HTMLButtonElement | null>(null);
  const mobileMenu = useRef<HTMLDivElement | null>(null);

  const toggleMobileMenu = () => {
    if (mobileMenuButton.current!.getAttribute("data-state") !== "opened") {
      mobileMenuButton.current!.setAttribute("data-state", "opened");
      mobileMenuButton.current!.setAttribute("aria-expanded", "true");
      mobileMenu.current!.style.display = "flex";
      gsap.fromTo(mobileMenu.current, { opacity: 0, y: "-5vh" }, { opacity: 1, y: 0, duration: 0.5, ease: "ease" });
    } else {
      closeMobileMenu();
    }
  };

  const closeMobileMenu = () => {
    mobileMenuButton.current!.setAttribute("data-state", "closed");
    mobileMenuButton.current!.setAttribute("aria-expanded", "false");
    gsap.to(mobileMenu.current, {
      opacity: 0,
      y: "-5vh",
      duration: 0.5,
      ease: "ease",
      onComplete: () => {
        mobileMenu.current!.style.display = "none";
      },
    });
  };

  useEffect(() => {
    if (isTransitioning === TransitionState.DoneTransitioning) {
      closeMobileMenu();
    }
  }, [isTransitioning]);

  return (
    <header>
      <nav id="header" className="light">
        <a href="/" id="maddie-text" onClick={(e: any) => mweNavigate(e, handleNavigation, "/")}>
          MADDIE WEST
        </a>
        <div id="nav-options">
          <a href="/about" className="nav-link" onClick={(e: any) => mweNavigate(e, handleNavigation, "/about")}>
            About
          </a>
          <a
            href="/testimonies"
            className="nav-link"
            onClick={(e: any) => mweNavigate(e, handleNavigation, "/testimonies")}
          >
            Testimonies
          </a>
          <a href="/packages" className="nav-link" onClick={(e: any) => mweNavigate(e, handleNavigation, "/packages")}>
            Packages
          </a>
          <a href="/journal" className="nav-link" onClick={(e: any) => mweNavigate(e, handleNavigation, "/journal")}>
            Journal
          </a>
          <a
            href="/contact"
            className="primary-button medium light"
            id="call-to-action"
            onClick={(e: any) => mweNavigate(e, handleNavigation, "/contact")}
          >
            Contact
          </a>
        </div>
        <button
          id="nav-icon"
          ref={mobileMenuButton}
          className="more-btn"
          aria-controls="primary-navigation"
          aria-expanded="false"
          onClick={() => {
            toggleMobileMenu();
          }}
        >
          <svg fill="var(--button-color)" className="hamburger" viewBox="0 0 100 100" width="35px">
            <rect className="line top" width="80" height="2" x="10" y="37" rx="5" fill="currentColor"></rect>
            <rect className="line bottom" width="80" height="2" x="10" y="63" rx="5" fill="currentColor"></rect>
          </svg>
        </button>
      </nav>

      <div id="mobile-menu-wrapper" ref={mobileMenu} className="mobile-menu-wrapper active">
        <div id="mobile-menu" className="mobile-menu">
          <img src="/general/menu_1.webp" alt="aesthetic wedding photo" />

          <div id="link-wrapper">
            <a id="link" href="/index" onClick={(e: any) => mweNavigate(e, handleNavigation, "/")}>
              HOME
            </a>
            <a id="link" href="/about" onClick={(e: any) => mweNavigate(e, handleNavigation, "/about")}>
              ABOUT
            </a>
            <a id="link" href="/testimonies" onClick={(e: any) => mweNavigate(e, handleNavigation, "/testimonies")}>
              TESTIMONIES
            </a>
            <a id="link" href="/packages" onClick={(e: any) => mweNavigate(e, handleNavigation, "/packages")}>
              PACKAGES
            </a>
            <a id="link" href="/journal" onClick={(e: any) => mweNavigate(e, handleNavigation, "/journal")}>
              JOURNAL
            </a>
            <a id="instagram" href={env.INSTAGRAM_URL} onClick={() => closeMobileMenu()} target="_blank">
              INSTAGRAM
            </a>
            <a
              className="primary-button large light"
              href="/contact"
              onClick={(e: any) => mweNavigate(e, handleNavigation, "/contact")}
            >
              CONTACT
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
