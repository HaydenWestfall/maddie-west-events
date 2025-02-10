import { useGSAP } from "@gsap/react";
import "./home.scss";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { createGsapAnimation, mweNavigate } from "../../shared/utility";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const JournalSection: React.FC<{ handleNavigation: (path: string) => void }> = ({ handleNavigation }) => {
  const journalContainer = useRef<HTMLDivElement | null>(null);
  const journalSubHeader = useRef<HTMLDivElement | null>(null);
  const journalHeader = useRef<HTMLDivElement | null>(null);
  const journalDescription = useRef<HTMLDivElement | null>(null);
  const journalCarousel = useRef<HTMLDivElement | null>(null);

  let marqueeInterval = 0;
  let index = 0;
  let journalScrollAnimation: any;
  let journalFadeOutAnimation: any;
  let journalFadeInAnimation: any;

  useEffect(() => {
    initJournalSection();
    window.addEventListener("resize", initJournalSection);
    return () => {
      window.removeEventListener("resize", initJournalSection);
      if (marqueeInterval) clearInterval(marqueeInterval);
    };
  }, []);

  useGSAP(
    () => {
      createGsapAnimation(journalSubHeader.current, 30, "top 75%", "top 25%", true);
      createGsapAnimation(journalHeader.current, 30, "top 75%", "top 25%", true);
      createGsapAnimation(journalDescription.current, 30, "top 75%", "top 25%", true);
    },
    { scope: journalContainer }
  );

  /**
   * Determine if journal section should fade images or marquee images
   */
  const initJournalSection = () => {
    const journalImages = Array.from(journalCarousel.current!.children);

    clearInterval(marqueeInterval);
    if (journalScrollAnimation) {
      journalScrollAnimation.kill();
      journalCarousel.current!.style.transform = "unset";
    }

    // Passes use desktop config, if fails use mobile
    if (document.documentElement.clientWidth > 768) {
      if (journalFadeInAnimation) {
        journalFadeInAnimation.kill();
      }
      if (journalFadeOutAnimation) {
        journalFadeOutAnimation.kill();
      }
      initDesktopJournal();
    } else {
      journalCarousel.current!.classList.add("fade-images");
      journalImages.forEach((journalImage) => {
        (journalImage as HTMLImageElement).style.opacity = "0";
      });
      marqueeInterval = setInterval(() => {
        initMobileJournal();
      }, 3000);
    }
  };

  /**
   * Journal images will marquee on scroll
   */
  const initDesktopJournal = () => {
    const journalImages = Array.from(journalCarousel.current!.children);
    journalCarousel.current!.classList.remove("fade-images");
    journalImages.forEach((journalImage) => {
      (journalImage as HTMLImageElement).style.opacity = "1";
    });
    journalScrollAnimation = gsap.fromTo(
      "#section-journal-images",
      { x: "-15%" },
      {
        ease: "power1.out",
        x: "-30%",
        scrollTrigger: {
          trigger: "#section-journal-images",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  };

  /**
   * Journal images will fade in and out
   */
  const initMobileJournal = () => {
    const journalImages = Array.from(journalCarousel.current!.children);
    journalFadeOutAnimation = gsap.to(journalImages[index], {
      opacity: 0,
      duration: 2,
    });
    index = index == journalImages.length - 1 ? 0 : index + 1;
    journalFadeInAnimation = gsap.to(journalImages[index], {
      opacity: 1,
      duration: 2,
    });
  };

  return (
    <section ref={journalContainer} className="section-journal">
      <div id="section-journal-header-wrapper" className="section-header">
        <h6 ref={journalSubHeader} id="section-journal-subheader" style={{ color: "white" }}>
          JOURNAL
        </h6>
        <h2 ref={journalHeader} id="section-journal-header" style={{ color: "white" }}>
          timely EXECUTION through
          <br />
          conscious COORDINATION
        </h2>
        <p ref={journalDescription} id="section-journal-description" className="description justify centered">
          I leave each wedding feeling so impacted by each of my couples and their families, most of whom are a true
          testimony of what marriage really is. It's about more than just executing ceremonies and receptions; it's
          about incorporating the countless emotions, traditions, and aspirations to create a day full of unforgettable
          joy. A day where love is not just celebrated, but meticulously curated.
          <br />
          <br />
          It's a career that demands creativity, empathy, and a keen eye for detail, but the reward lies in being part
          of one of the most significant days in people's lives, where happiness reigns supreme, and love knows no
          bounds.
        </p>
      </div>

      <div id="section-journal-image-wrapper">
        <div ref={journalCarousel} id="section-journal-images" className="journal-marquee">
          <img
            loading="lazy"
            src="/home/journal_4.webp"
            className="image"
            alt="Aesthetic image of chair with flowers"
          />
          <img loading="lazy" src="/home/journal_2.webp" className="image" alt="Aesthetic image of a tablescape" />
          <img loading="lazy" src="./home/journal_3.webp" className="image" alt="Aesthetic image of Maddie West" />
          <img loading="lazy" src="/home/journal_1.webp" className="image" alt="Aesthetic image of a cake table" />
          <img loading="lazy" src="/home/journal_5.webp" className="image" alt="Wedding invitation on tablescape" />
        </div>
      </div>
      <a
        href="/journal"
        id="section-journal-button"
        className="text-button journal-button"
        onClick={(e: any) => mweNavigate(e, handleNavigation, "/journal")}
      >
        EXPLORE JOURNAL
      </a>
    </section>
  );
};

const AestheticSection: React.FC = () => {
  const aestheticContainer = useRef<HTMLDivElement | null>(null);
  const aestheticImage1 = useRef<HTMLImageElement | null>(null);
  const aestheticImage2 = useRef<HTMLImageElement | null>(null);
  const aestheticImage3 = useRef<HTMLImageElement | null>(null);
  const aestheticImage4 = useRef<HTMLImageElement | null>(null);
  const aestheticSubHeader = useRef<HTMLDivElement | null>(null);
  const aestheticHeader = useRef<HTMLDivElement | null>(null);
  const aestheticDescription = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      createGsapAnimation(aestheticImage1.current, 30, "top 75%", "top 35%", true);
      createGsapAnimation(aestheticImage2.current, 30, "top 75%", "top 35%", true);
      createGsapAnimation(aestheticImage3.current, 30, "top 69%", "top 31%", true);
      createGsapAnimation(aestheticImage4.current, 30, "top 75%", "top 35%", true);
      createGsapAnimation(aestheticSubHeader.current, 30, "top 75%", "top 35%", true);
      createGsapAnimation(aestheticHeader.current, 30, "top 75%", "top 35%", true);
      createGsapAnimation(aestheticDescription.current, 30, "top 75%", "top 35%", true);
    },
    { scope: aestheticContainer }
  );

  return (
    <section ref={aestheticContainer} id="section-aesthetic" style={{ maxWidth: "unset" }}>
      <div id="aesthetic-wrapper">
        <img ref={aestheticImage1} id="aesthetic-image-1" loading="lazy" src="/home/aesthetic_1.webp" />
        <img ref={aestheticImage2} id="aesthetic-image-2" loading="lazy" src="/home/aesthetic_2.webp" />
        <div id="aesthetic-description-wrapper" className="section-header">
          <h6 ref={aestheticSubHeader} id="aesthetic-subheader">
            THE AESTHETIC
          </h6>
          <h3 ref={aestheticHeader} id="aesthetic-header">
            TIMELESS, MODERN, AND REFINED
          </h3>
          <p
            ref={aestheticDescription}
            id="aesthetic-description"
            className="description justify"
            style={{ maxWidth: "40rem !important" }}
          >
            The aesthetic of a wedding is what sets the tone for the entire celebration, blending personal style with
            timeless elegance. From the delicacy of a whimsical garden affair to the sleek sophistication of a modern
            metropolitan affair, every wedding aesthetic tells a unique story of love and commitment. It's about
            creating a cohesive visual narrative that reflects the couple's personalities and aspirations.
            <br />
            <br />
            Whether it's a lavish hall adorned with cascading florals or an intimate backyard gathering illuminated by
            string lighting, the beauty lies in the thoughtful curation of every element, from the invitations to the
            tablescapes. Ultimately, wedding aesthetics are a celebration of individuality and unity, where every detail
            whispers of the couple's journey and their aspirations for the future together.
          </p>
        </div>
      </div>
      <img ref={aestheticImage3} id="aesthetic-image-3" loading="lazy" src="/home/aesthetic_3.webp" />
      <img ref={aestheticImage4} id="aesthetic-image-4" loading="lazy" src="/home/aesthetic_4.webp" />
    </section>
  );
};

const MaddieFlowersSection: React.FC = () => {
  const maddieFlowersContainer = useRef<HTMLDivElement | null>(null);
  const maddieFlowersHeader = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      createGsapAnimation(maddieFlowersHeader.current, 30, "top 75%", "top 35%", true);
    },
    { scope: maddieFlowersContainer }
  );

  return (
    <section ref={maddieFlowersContainer} id="maddie-flowers-section">
      <div id="secondary-video">
        <video id="myVideo" src="./videos/maddie_secondary.mp4" autoPlay loop muted playsInline preload="none"></video>
      </div>
      <div>
        <h1 ref={maddieFlowersHeader} id="maddie-flowers-header">
          the AESTHETIC consists of
          <br />
          CAREFULLY CURATED DETAILS
        </h1>
      </div>
    </section>
  );
};

const HomeRoute: React.FC<{ handleNavigation: (path: string) => void }> = ({ handleNavigation }) => {
  const mainSubHeader = useRef<HTMLHeadingElement | null>(null);
  const aboutHeader = useRef<HTMLDivElement | null>(null);
  const aboutContainer = useRef<HTMLDivElement | null>(null);
  const column1 = useRef<HTMLDivElement | null>(null);
  const column2 = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      createGsapAnimation(column1.current, 30, "top 75%", "top 25%", true);
      createGsapAnimation(column2.current, 30, "top 75%", "top 25%", true);
    },
    { scope: aboutContainer }
  );

  useEffect(() => {
    if (window.innerWidth > 768) {
      mainSubHeader.current!.innerHTML = "WEDDING AND EVENT COORDINATOR";
      aboutHeader.current!.innerHTML = "The SUCCESS of an EVENT lies within the CAREFUL CONSIDERATION of its DETAILS";
    } else {
      mainSubHeader.current!.innerHTML = "EVENT COORDINATOR";
      aboutHeader.current!.innerHTML = "The SUCCESS of an EVENT lies within the CONSIDERATION of its DETAILS";
    }
  }, []);

  return (
    <main data-barba="wrapper">
      <div data-barba="container" data-barba-namespace="index" className="home_route">
        <section id="main" className="section-main">
          <div id="primary-video">
            <video id="myVideo" src="/videos/maddie_primary.mp4" autoPlay muted loop playsInline preload="auto"></video>
          </div>
          <div id="title">
            <h6 id="main-subheader" ref={mainSubHeader}>
              WEDDING AND EVENT COORDINATOR
            </h6>
            <h1 id="main-header">
              EVERY detail adds DEPTH to the
              <br />
              NARRATIVE of CELEBRATION
            </h1>
          </div>
        </section>

        <section ref={aboutContainer} className="section-about">
          <div className="section-wrapper">
            <div ref={column1} id="section-about-column1" className="section-header">
              <h4 id="section-about-header" ref={aboutHeader}>
                The SUCCESS of an EVENT lies within the CAREFUL CONSIDERATION of its DETAILS
              </h4>
              <h6 id="section-about-subheader">MADISON WESTFALL</h6>
            </div>
            <div ref={column2} id="section-about-column2">
              <p id="about-maddie-description" className="description justify">
                My passion for detail and execution allows me to bring to fruition a day that allows the couple, the
                families, the bridal party, and all the guests to indulge in the goodness surrounding them.
                <br />
                <br />
                I want your wedding day to be full of memorable moments that you, your family and friends will remember
                for years to come.
                <br />
                <br />
                If you’re already thinking about the look and feel of your wedding or event, I have a feeling you love
                the details just as much as I do! If you decide to book with me, you're investing in an experience that
                allows you to be fully present while I’m taking care of all of the details. 
              </p>
            </div>
          </div>
        </section>

        <JournalSection handleNavigation={handleNavigation} />

        <section id="section-testimony">
          <div id="testimony-wrapper">
            <div id="testimony">
              <div id="text-wrapper">
                <h6 className="small">CLIENT TESTIMONY</h6>
                <h4 className="quote-italic">
                  "Maddie literally SAVED THE DAY for our wedding! This girl did EVERYTHING...
                </h4>
                <p className="description justify light" style={{ fontSize: "0.8rem" }}>
                  ... and more for us! We hired Maddie as our day-of coordinator only a couple months before our day,
                  after we realized how insane planning a wedding was! She allowed me to feel relaxed knowing she was
                  running the show!"
                </p>
                <a
                  href="/testimonies"
                  className="text-button"
                  style={{ alignSelf: "flex-end", marginTop: "2.5rem" }}
                  onClick={(e: any) => mweNavigate(e, handleNavigation, "/testimonies")}
                >
                  READ MORE
                </a>
              </div>
            </div>
            <div id="testimony-image-wrapper">
              <img loading="lazy" id="testimony-image" src="/home/about_maddie.webp" alt="Picture of Maddie West" />
            </div>
          </div>
        </section>

        <section id="section-vendor-list">
          <span id="vendor-label">A FEW OF MY FAVORITES</span>
          <div id="vendor-images">
            <img loading="lazy" src="/home/cliffside.png" className="vendor" />
            <img loading="lazy" src="/home/steamplant.png" className="vendor" />
            <img loading="lazy" src="/home/jorgensen.png" className="vendor small" />
            <img loading="lazy" src="/home/arcade.png" className="vendor" />
          </div>
        </section>

        <AestheticSection />

        <MaddieFlowersSection />
      </div>
    </main>
  );
};

export default HomeRoute;
