import "./rentals.scss";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { componentOnLoadAnimationDelay, mweNavigate, TransitionState } from "../../shared/utility";
import { useMWETransitionContext } from "../../shared/route-transition/TransitionProvider";
import RentalAgreement from "./components/RentalAgreement";
import Seo from "../../seo/Seo";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const RentalAgreementRoute: React.FC<{ handleNavigation: (path: string) => void }> = ({ handleNavigation }) => {
  const { isTransitioning } = useMWETransitionContext();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (isTransitioning === TransitionState.DoneTransitioning) {
        gsap.fromTo(
          containerRef.current,
          { y: "40px", opacity: 0 },
          { y: "0", opacity: 1, duration: 0.7, delay: componentOnLoadAnimationDelay },
        );
      }
    },
    { dependencies: [isTransitioning], scope: containerRef },
  );

  return (
    <div className="rental-agreement_page">
      <Seo route="/rentals/agreement" />
      <div className="agreement-page-header">
        <a href="/" className="agreement-wordmark" onClick={(e: any) => mweNavigate(e, handleNavigation, "/")}>
          MADDIE WEST
        </a>
      </div>

      <main data-barba="wrapper">
        <div
          ref={containerRef}
          data-barba="container"
          data-barba-namespace="rental-agreement"
          className="rental-agreement_route"
        >
          <RentalAgreement />
        </div>
      </main>

      <footer className="agreement-page-footer">
        <span>© Maddie West Events {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default RentalAgreementRoute;
