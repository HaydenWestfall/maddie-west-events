import "./contact.scss";
import "./form.scss";
import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { componentOnLoadAnimationDelay, mweNavigate, TransitionState } from "../../shared/utility";
import { useMWETransitionContext } from "../../shared/route-transition/TransitionProvider";
import { env } from "../../config/env";
import EventContactForm from "./EventContactForm";
import StudioContactForm from "./StudioContactForm";
import Overlay, { OverlayRef } from "../../shared/overlay";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const ContactRoute: React.FC<{ handleNavigation: (path: string) => void }> = ({ handleNavigation }) => {
  const { isTransitioning } = useMWETransitionContext();
  const contactContainer = useRef<HTMLDivElement | null>(null);
  const contactHeader = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<OverlayRef | null>(null);

  // Form type selection state
  const [selectedFormType, setSelectedFormType] = useState<"event" | "studio">("event");

  // Handle successful form submission from child components
  const handleFormSubmissionSuccess = () => {
    if (overlayRef.current) {
      overlayRef.current.show();
    }
  };

  useGSAP(
    () => {
      if (isTransitioning === TransitionState.DoneTransitioning) {
        const timeline = gsap.timeline({ delay: componentOnLoadAnimationDelay });
        timeline.fromTo(contactHeader.current, { y: "80px", opacity: 0 }, { y: "0", opacity: 1, duration: 0.7 });
        timeline.play();
      }
    },
    { dependencies: [isTransitioning], scope: contactContainer }
  );

  return (
    <main data-barba="wrapper">
      <div ref={contactContainer} data-barba="container" data-barba-namespace="contact" className="contact_route">
        <section id="contact-header">
          <img src="/contact/contact_cover.webp" alt="Madison Westfall posing in front of a tablescape" />
          <div id="accent-wrapper">
            <span id="maddie-west-accent">MADDIE WEST EVENTS | EVENT COORDINATOR</span>
          </div>
          <h1 ref={contactHeader} id="contact-header-text">
            RELAX your BIG DAY
            <br /> is in GOOD HANDS
          </h1>
        </section>

        <section id="contact-section">
          <div id="contact-form-wrapper">
            <p>
              FILL IN THE FORM BELOW AND YOU WILL HEAR BACK FROM ME WITHIN 48 HOURS. PLEASE ENTER AS MUCH INFORMATION
              ABOUT YOUR DAY AS YOU CAN.
            </p>

            {/* Form Type Selector */}
            <div id="form-type-selector">
              <label className="input-label">Service Type</label>
              <div className="form-type-tabs">
                <button
                  type="button"
                  className={`form-type-tab ${selectedFormType === "event" ? "active" : ""}`}
                  onClick={() => setSelectedFormType("event")}
                >
                  EVENT PLANNING
                </button>
                <button
                  type="button"
                  className={`form-type-tab ${selectedFormType === "studio" ? "active" : ""}`}
                  onClick={() => setSelectedFormType("studio")}
                >
                  STUDIO BOOKING
                </button>
              </div>
            </div>
            <button onClick={() => overlayRef.current!.show()}>test</button>

            {/* Conditional Form Rendering */}
            {selectedFormType === "event" ? (
              <EventContactForm onSubmissionSuccess={handleFormSubmissionSuccess} />
            ) : (
              <StudioContactForm onSubmissionSuccess={handleFormSubmissionSuccess} />
            )}
          </div>
        </section>

        <Overlay ref={overlayRef} className="thank-you-overlay" id="overlay">
          <div className="thank-you-modal" id="modal">
            <div className="header">
              <span>THANK YOU</span>
              <Player id="fireworks" src={env.LOTTIE_FIREWORKS_URL} speed={0.7} loop autoplay />
            </div>
            <div className="body">
              I have received your inquiry and will get back with you within the next 48 hours.
            </div>
            <a
              href="/"
              className="text-button small"
              onClick={(e: any) => {
                overlayRef.current?.hide();
                mweNavigate(e, handleNavigation, "/");
              }}
            >
              HOME
            </a>
          </div>
        </Overlay>
      </div>
    </main>
  );
};

export default ContactRoute;
