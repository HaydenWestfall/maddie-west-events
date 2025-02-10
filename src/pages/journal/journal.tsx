import "./journal.scss";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { componentOnLoadAnimationDelay, TransitionState } from "../../shared/utility";
import { useMWETransitionContext } from "../../shared/route-transition/TransitionProvider";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const JournalRoute: React.FC = () => {
  const { isTransitioning } = useMWETransitionContext();

  const journalContainer = useRef<HTMLDivElement | null>(null);
  const journalImagesContainer = useRef<HTMLDivElement | null>(null);
  const journal1 = useRef<HTMLImageElement | null>(null);
  const journal2 = useRef<HTMLImageElement | null>(null);
  const journal3 = useRef<HTMLImageElement | null>(null);
  const journal4 = useRef<HTMLImageElement | null>(null);
  const journal5 = useRef<HTMLImageElement | null>(null);
  const journalHeader = useRef<HTMLDivElement | null>(null);

  const imageAnimationDuration = 0.5;
  let fadeInterval: number | null = null;
  let index = 0;
  let imageWidth = document.documentElement.clientWidth > 768 ? "100%" : "7rem";

  useGSAP(
    () => {
      if (isTransitioning === TransitionState.DoneTransitioning) {
        initJournal();
        window.addEventListener("resize", initJournal);
      }

      return () => {
        window.removeEventListener("resize", initJournal);
        if (fadeInterval) clearInterval(fadeInterval);
      };
    },
    { dependencies: [isTransitioning], scope: journalContainer }
  );

  const initJournal = () => {
    if (document.documentElement.clientWidth > 768) {
      if (fadeInterval) clearInterval(fadeInterval);
      journalHeader.current!.style.opacity = "1";
      journalImagesContainer.current!.querySelectorAll("div").forEach((elem) => {
        (elem.children[0] as HTMLImageElement).style.opacity = "1";
      });
      initDesktopJournal();
    } else {
      fadeImagesJournal();
      initMobileJournal();
    }
  };

  const initDesktopJournal = () => {
    const timeline = gsap.timeline({ delay: componentOnLoadAnimationDelay });
    const journalDelay = "<=.15";
    timeline.fromTo(
      journal1.current,
      { opacity: 0, width: "15%" },
      { opacity: 1, width: imageWidth, duration: imageAnimationDuration }
    );
    timeline.fromTo(
      journal2.current,
      { opacity: 0, width: "15%" },
      { opacity: 1, width: imageWidth, duration: imageAnimationDuration },
      journalDelay
    );
    timeline.fromTo(
      journal3.current,
      { opacity: 0, width: "15%" },
      { opacity: 1, width: imageWidth, duration: imageAnimationDuration },
      journalDelay
    );
    timeline.fromTo(
      journal4.current,
      { opacity: 0, width: "15%" },
      { opacity: 1, width: imageWidth, duration: imageAnimationDuration },
      journalDelay
    );
    timeline.fromTo(
      journal5.current,
      { opacity: 0, width: "15%" },
      { opacity: 1, width: imageWidth, duration: imageAnimationDuration },
      journalDelay
    );
    timeline.fromTo(journalHeader.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
    timeline.play();
  };

  const initMobileJournal = () => {
    gsap.registerPlugin(ScrollTrigger);
    const timeline = gsap.timeline({ delay: componentOnLoadAnimationDelay });
    timeline.fromTo(journalHeader.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
    timeline.play();

    fadeInterval = setInterval(() => {
      fadeImagesJournal();
    }, 3000);
  };

  const fadeImagesJournal = () => {
    const imageArray = journalImagesContainer.current!.querySelectorAll("div");
    const currentImage = imageArray[index].children[0];
    const nextImage = imageArray[index === 4 ? 0 : index + 1].children[0];

    gsap.to(currentImage, { opacity: 0, ease: "none", duration: 0.75 });
    gsap.to(nextImage, { opacity: 1, ease: "none", duration: 0.75 });

    index = index === 4 ? 0 : index + 1;
  };

  return (
    <main data-barba="wrapper">
      <div ref={journalContainer} data-barba="container" data-barba-namespace="journal" className="journal_route">
        <div className="section">
          <div className="journal-header-wrapper">
            <div ref={journalImagesContainer} id="journal-images-container" className="journal-images">
              <div className="cell" style={{ opacity: 1 }}>
                <img
                  ref={journal1}
                  id="journal-1"
                  className="journal-image image-1"
                  src="/journal/journal_header_3.webp"
                />
              </div>
              <div className="cell">
                <img
                  ref={journal2}
                  id="journal-2"
                  className="journal-image image-2"
                  src="/journal/journal_header_1.webp"
                />
              </div>
              <div className="cell">
                <img
                  ref={journal3}
                  id="journal-3"
                  className="journal-image image-3"
                  src="/journal/journal_header_2.webp"
                />
              </div>
              <div className="cell">
                <img
                  ref={journal4}
                  id="journal-4"
                  className="journal-image image-4"
                  src="/journal/journal_header_4.webp"
                />
              </div>
              <div className="cell">
                <img
                  ref={journal5}
                  id="journal-5"
                  className="journal-image image-5"
                  src="/journal/journal_header_5.webp"
                />
              </div>
            </div>

            <div ref={journalHeader} className="journal-header" id="journal-header">
              <div className="header-text">
                <span>ITS ALL IN</span>
                <br />
                <span>THE DETAILS</span>
              </div>

              <div className="scroll-accent">
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.44935 8.10586C3.49288 8.06227 3.54458 8.0277 3.60149 8.00411C3.65839 7.98052 3.71939 7.96838 3.78099 7.96838C3.84259 7.96838 3.90359 7.98052 3.96049 8.00411C4.0174 8.0277 4.0691 8.06227 4.11263 8.10586L7.53099 11.5248L7.53099 2.34375C7.53099 2.21943 7.58037 2.1002 7.66828 2.01229C7.75619 1.92438 7.87542 1.875 7.99974 1.875C8.12406 1.875 8.24329 1.92438 8.3312 2.01229C8.4191 2.1002 8.46849 2.21943 8.46849 2.34375V11.5248L11.8868 8.10586C11.9748 8.0179 12.0941 7.96849 12.2185 7.96849C12.3429 7.96849 12.4622 8.0179 12.5501 8.10586C12.6381 8.19381 12.6875 8.31311 12.6875 8.4375C12.6875 8.56189 12.6381 8.68118 12.5501 8.76914L8.33138 12.9879C8.28785 13.0315 8.23615 13.066 8.17924 13.0896C8.12234 13.1132 8.06134 13.1254 7.99974 13.1254C7.93814 13.1254 7.87714 13.1132 7.82024 13.0896C7.76333 13.066 7.71163 13.0315 7.6681 12.9879L3.44935 8.76914C3.40577 8.7256 3.37119 8.67391 3.3476 8.617C3.32401 8.56009 3.31187 8.4991 3.31187 8.4375C3.31187 8.3759 3.32401 8.3149 3.3476 8.25799C3.37119 8.20109 3.40577 8.14939 3.44935 8.10586Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="journal-entry-section">
          <div className="journal-entry-wrapper">
            <span className="couple-name">OLIVIA + MICHAEL</span>
            <p className="wedding-description">
              <span className="first-letter">O</span>livia and Michael’s day was nothing short of pure. May 20th had a
              spring color pallet featuring soft pinks, light yellows and warm shades of orange.  Olivia spent countless
              hours planning her day and ample time creating by hand the details that brought it together. Each table
              had an acrylic number placed on a plaster sign, which SHE MADE. The signage for the gift + cards, for
              their signature drinks, for the bar menu, all cut out of vinyl and placed on a canvas fabric, giving it
              that organic look, which SHE MADE…. Lastly their elaborate seating chart that featured “all of their
              favorite people”…… which SHE MADE. <br />
              <br />
              Their florals were the perfect pop of subtle color that just enhanced the spring aesthetic. Their day was
              full of such intention and the happy tears never seemed to cease. Both of their families were such a true
              testimony to what marriage is really about and both families were equally as excited for Olivia and
              Michael to embark on the commitment of a lifetime. I am writing this a year later, and I still feel warm
              thinking about how full of joy their day was.
            </p>
            <div className="images">
              <img loading="lazy" id="journal-entry-1-1" src="/journal/journal_entry_1_1.webp" />
              <img loading="lazy" id="journal-entry-1-2" src="/journal/journal_entry_1_2.webp" />
              <img loading="lazy" id="journal-entry-1-3" src="/journal/journal_entry_1_3.webp" />
            </div>
          </div>
        </div>

        <div className="journal-entry-section">
          <div className="journal-entry-wrapper">
            <span className="couple-name">LAUREN + SAM</span>
            <p className="wedding-description">
              <span className="first-letter">M</span>arch 30th, my first of the season, and Lauren + Sam’s day could not
              have been more fruitful. Both Lauren and Sam have such depth as humans, and they did not refrain from
              showing it. They chose to read their personal vows aloud, in front of all of their guests, mic'd up and
              hands shaking as they clung to their handwritten vows… and they shared every word. I remember Lauren
              referencing Sam as a “mirror to her soul”, and while the verbiage seems wise beyond her years, it was
              evident. All day long, they smiled at each other, smiling deeper than the exterior, past the wedding dress
              and suit, for reasons other than because the photographer asked us to. Their parents did the same, they
              smiled the same way at their spouses throughout the day and at their children while they shared their
              first dance. It was evident where Lauren and Sam get their depth from. It was a beautiful spring day and a
              beautiful start to a marriage that I know will have immeasurable depth.
            </p>
            <div className="images">
              <img loading="lazy" id="journal-entry-2-1" src="/journal/journal_entry_2_1.webp" />
              <img loading="lazy" id="journal-entry-2-2" src="/journal/journal_entry_2_2.webp" />
              <img loading="lazy" id="journal-entry-2-3" src="/journal/journal_entry_2_3.webp" />
            </div>
          </div>
        </div>

        <div className="journal-entry-section">
          <div className="journal-entry-wrapper">
            <span className="couple-name">JULIA + COLE</span>
            <p className="wedding-description">
              <span className="first-letter">I</span>f I had to describe Julia and Cole’s day in one word, it would be
              “real.” It’s easy to get caught up in everything that your wedding day could be…. I never once felt that
              this was the case for Julia and Cole. They always knew exactly what their wedding day should be, which was
              a celebration and a commitment. They approached the day with such a calm manner because at the end of the
              day, if the two of them were married, nothing else mattered. Their families and their bridal parties
              followed suit and the day was just that, a celebration.
              <br />
              <br />
              Their wedding had a black and white color pallet, which made it easy to get lost in the moment, featuring
              greens that nurtured life. While there were happy tears, because there always are, there were mostly smile
              cramps. I have occasionally bumped into the two since their wedding and they seem to still be celebrating;
              celebrating their lives, their marriage, their friends, and their families. I hope they never stop doing
              this. I hope they never stop being real.
            </p>
            <div className="images">
              <img loading="lazy" id="journal-entry-3-1" src="/journal/journal_entry_3_1.webp" />
              <img loading="lazy" id="journal-entry-3-2" src="/journal/journal_entry_3_2.webp" />
              <img loading="lazy" id="journal-entry-3-3" src="/journal/journal_entry_3_3.webp" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JournalRoute;
