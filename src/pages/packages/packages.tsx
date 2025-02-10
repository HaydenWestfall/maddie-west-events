import "./packages.scss";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { componentOnLoadAnimationDelay, mweNavigate, TransitionState } from "../../shared/utility";
import { useMWETransitionContext } from "../../shared/route-transition/TransitionProvider";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const PackagesRoute: React.FC<{ handleNavigation: (path: string) => void }> = ({ handleNavigation }) => {
  const { isTransitioning } = useMWETransitionContext();
  const packagesContainer = useRef<HTMLDivElement | null>(null);
  const packagesHeader = useRef<HTMLDivElement | null>(null);
  const packagesSubHeader = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (isTransitioning === TransitionState.DoneTransitioning) {
        const timeline = gsap.timeline({ delay: componentOnLoadAnimationDelay });
        timeline.fromTo(packagesHeader.current, { y: "40px", opacity: 0 }, { y: "0", opacity: 1, duration: 0.7 });
        timeline.fromTo(
          packagesSubHeader.current,
          { y: "40px", opacity: 0 },
          { y: "0", opacity: 1, duration: 0.7 },
          "0"
        );

        const packageElements = document.querySelectorAll(".package-wrapper");
        for (let i = 0; i < packageElements.length; i++) {
          if (i === 0) {
            timeline.fromTo(
              packageElements[i],
              { y: "40px", opacity: 0 },
              { y: "0", opacity: 1, duration: 0.7 },
              "<=0"
            );
          } else {
            gsap.fromTo(
              packageElements[i],
              { y: "200px", opacity: 0 },
              {
                y: 0,
                opacity: 1,
                scrollTrigger: {
                  trigger: packageElements[i],
                  start: "top bottom",
                  end: "top 30%",
                  scrub: true,
                },
              }
            );
          }
        }

        timeline.play();
      }
    },
    { dependencies: [isTransitioning], scope: packagesContainer }
  );

  return (
    <main data-barba="wrapper">
      <div ref={packagesContainer} data-barba="container" data-barba-namespace="packages" className="packages_route">
        <div className="packages-header">
          <div className="header" ref={packagesHeader}>
            COORDINATION PACKAGES
          </div>
          <div className="sub-header" ref={packagesSubHeader}>
            CREATED AND EXECUTED BY MADDIE WESTFALL
          </div>
        </div>

        <div className="packages-body">
          <div className="package-wrapper">
            <div className="package-image">
              <img src="/packages/month_of_package.webp" />
            </div>
            <div className="package-info-wrapper">
              <div className="package-info">
                <div className="package-info-container">
                  <div className="package-header">
                    <span>MONTH OF COORDINATION PACKAGE</span>
                    <span>PRICE:</span>
                  </div>
                  <div className="divider"></div>
                  <div className="details">
                    <div className="info-price-wrapper">
                      <p>This package begins one month prior to the wedding day.</p>
                      <span>$1,650</span>
                    </div>
                    <p className="description">
                      Starting one month before the wedding, this package is ideal for brides who are confident in their
                      ability to do their own planning leading up to the wedding; choosing their vendors, deciding on
                      and acquiring all of their decorations, and finalizing the details. The Month of Coordination
                      Package includes services that allow for your vision to be brought to life and allows you to
                      instead indulge in the goodness surrounding you.
                    </p>
                    <span className="includes-text">INCLUDES:</span>
                    <ul>
                      <li>
                        Initial meeting one month out to discuss all of the details, finalize the timeline and draft the
                        processional.
                      </li>
                      <li>
                        Attend and assist in running the rehearsal. Finalizing the processional and practicing timing.
                      </li>
                      <li>
                        10 hours on the day-of, ensuring that the timeline is followed including set up and breakdown.
                        Additional hours can be added at a fee if necessary.
                      </li>
                    </ul>
                    <span className="includes-text">DAY OF RESPONSIBILITIES:</span>
                    <ul>
                      <li>
                        Directing and communicating with vendors. Serving as the point of communication for every vendor
                        (so the couple doesn’t have to).
                      </li>
                      <li>
                        Executing all of the details and making sure the aesthetic is to your liking. Making sure set-up
                        and décor for ceremony and reception is as requested.
                      </li>
                      <li>Greeting guests and/or instructing ushers on the best way to greet and seat.</li>
                      <li>Organizing and properly spacing the bridal party for the processional line-up.</li>
                      <li>Keeping track of the marriage license, ritual items, and rings.</li>
                      <li>Gathering up and distributing the ceremony items at the ceremony site.</li>
                      <li>Verify that stationary items such as favors and place cards are properly placed.</li>
                      <li>Lighting the candles just before go time.</li>
                      <li>Confirming set up of the guest book, gift table, cake table, rentals, etc.</li>
                      <li>
                        Following the timeline as the wedding continues, ensuring that the schedule is being carried out
                        according to plan.
                      </li>
                      <li>
                        Ensuring that gifts have been safely transferred from reception site to final destination.
                      </li>
                      <li>Respond to any last-minute emergencies or changes and be ready for anything!</li>
                    </ul>
                    <a
                      className="primary-button light large"
                      href="/contact"
                      onClick={(e: any) => mweNavigate(e, handleNavigation, "/contact")}
                    >
                      INQUIRE HERE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="package-wrapper second">
            <div className="package-info-wrapper" style={{ justifyContent: "flex-end" }}>
              <div className="package-info">
                <div className="package-info-container">
                  <div className="package-header align-left">
                    <span>FINAL PLANNING PACKAGE</span>
                    <span>PRICE:</span>
                  </div>
                  <div className="divider"></div>
                  <div className="details align-left">
                    <div className="info-price-wrapper">
                      <p>
                        This package begins 3 months prior to the wedding day. Please take note that this package
                        includes everything that the Month of Coordination package offers.
                      </p>
                      <span>$2,500</span>
                    </div>
                    <p className="description">
                      The Final Planning Package starts 3 months prior to the wedding day. This package is ideal for
                      brides that have all the confidence in their ability to choose their own vendors, deciding on and
                      acquire all of their own decorations, etc. The Final Planning Package is best suited for brides
                      who are in the final stages of the planning process and looking for additional assistance and
                      guidance as the wedding day quickly approaches.
                    </p>
                    <span className="includes-text">INCLUDES:</span>
                    <ul>
                      <li>Meeting once a month leading up to the wedding</li>
                      <li>
                        Attending final meetings with vendors, such as:
                        <ul style={{ marginLeft: "2rem" }}>
                          <li>Venue</li>
                          <li>Caterer</li>
                          <li>Florist</li>
                          <li>DJ</li>
                          <li>Rental Companies</li>
                          <li>Etc.</li>
                        </ul>
                      </li>
                      <li>Organizing and planning the rehearsal dinner</li>
                      <li>Confirming rental pieces and quantities</li>
                      <li>Assistance in mailing invitations</li>
                      <li>Developing and finalizing a timeline</li>
                      <li>Creating the seating chart</li>
                    </ul>
                    <a
                      className="primary-button light large"
                      href="/contact"
                      onClick={(e: any) => mweNavigate(e, handleNavigation, "/contact")}
                    >
                      INQUIRE HERE
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="package-image">
              <img src="/packages/final_planning_package.webp" style={{ float: "left" }} />
            </div>
          </div>

          <div className="package-wrapper">
            <div className="package-image">
              <img src="/packages/partial_planning_package.webp" />
            </div>
            <div className="package-info-wrapper">
              <div className="package-info">
                <div className="package-info-container">
                  <div className="package-header">
                    <span>PARTIAL PLANNING PACKAGE</span>
                    <span>PRICE:</span>
                  </div>
                  <div className="divider"></div>
                  <div className="details">
                    <div className="info-price-wrapper">
                      <p>
                        This package begins 6 months prior to the wedding day. Please take note that this package
                        includes everything that the Month of Coordination package offers.
                      </p>
                      <span>$3,250</span>
                    </div>
                    <p className="description">
                      The Partial Planning Package starts 6 months prior to the wedding day. This package is ideal for
                      brides that have all the confidence in their ability to choose their own venue, secure their date
                      and perhaps some of their vendors, but are looking for guidance throughout the remainder of the
                      planning process. The Partial Planning Package is best suited for brides who are in the midst of
                      the planning process and overwhelmed by what seems like a never-ending check list of things that
                      need to be accomplished, and in a timely manner.
                    </p>
                    <span className="includes-text">INCLUDES:</span>
                    <ul>
                      <li>Meeting once a month leading up to the wedding</li>
                      <li>Assistance in creating your wedding registry</li>
                      <li>Designing and ordering save the dates</li>
                      <li>Finalizing guest list</li>
                      <li>Scheduling alterations appointment</li>
                      <li>Deciding on bridesmaid dresses and men’s suits or tuxedos</li>
                      <li>
                        Researching other vendors, such as videographers, bar tenders, DJ or band, florist, rental
                        companies, etc.
                      </li>
                      <li>Deciding on decorations and quantities</li>
                      <li>Finalizing alcohol provider and quantities</li>
                    </ul>
                    <a
                      className="primary-button light large"
                      href="/contact"
                      onClick={(e: any) => mweNavigate(e, handleNavigation, "/contact")}
                    >
                      INQUIRE HERE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PackagesRoute;
