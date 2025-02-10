import "./about.scss";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { createGsapAnimation } from "../../shared/utility";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function AboutRoute() {
  const aboutContainer = useRef<HTMLDivElement | null>(null);
  const maddieHeadshot = useRef<HTMLImageElement | null>(null);
  const clientQuote = useRef<HTMLDivElement | null>(null);
  const aboutDescription1 = useRef<HTMLDivElement | null>(null);
  const aboutDescription2 = useRef<HTMLDivElement | null>(null);
  const styledShootSubHeader = useRef<HTMLDivElement | null>(null);
  const styledShootHeader = useRef<HTMLDivElement | null>(null);
  const styledShootDescription = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      createGsapAnimation(clientQuote.current, 50, "top 80%", "top 40%", true);
      createGsapAnimation(aboutDescription1.current, 50, "top 80%", "top 40%", true);
      createGsapAnimation(aboutDescription2.current, 50, "top 80%", "top 40%", true);
      createGsapAnimation(styledShootSubHeader.current, 50, "top 80%", "top 40%", true);
      createGsapAnimation(styledShootHeader.current, 50, "top 80%", "top 40%", true);
      createGsapAnimation(styledShootDescription.current, 50, "top 80%", "top 40%", true);
      gsap.fromTo(
        maddieHeadshot.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power1.out",
          scrollTrigger: {
            trigger: maddieHeadshot.current,
            start: "top 90%",
          },
        }
      );
    },
    { scope: aboutContainer }
  );

  return (
    <main data-barba="wrapper">
      <div ref={aboutContainer} data-barba="container" data-barba-namespace="about" className="about_route">
        <section id="section-about-main">
          <div id="about-video">
            <video id="myVideo" src="./videos/about_maddie.mp4" autoPlay loop muted playsInline preload="auto">
              Your browser does not support the video tag.
            </video>
          </div>
          <div id="about-accent">WEDDING AND EVENT COORDINATOR | DAYTON, CINCINNATI, COLUMBUS</div>
        </section>

        <section id="about-client-quote" ref={clientQuote}>
          <div id="quote">From a SMALL intimate event to the LARGEST GRAND NUPTIALS, SHE MAKES THE DAY!</div>
          <h6 id="client">ANNA ROSHAK | CLIENT</h6>
        </section>

        <section id="about-maddie">
          <img ref={maddieHeadshot} loading="lazy" id="about-maddie-image" src="/about/maddie_1.webp" />

          <div className="about-text-wrapper first">
            <p id="about-text-block-1" ref={aboutDescription1}>
              I’m Maddie Westfall, owner and lead coordinator of Maddie West Events. In 2022, I got married and executed
              the wedding that I had always envisioned. Having been a recent bride myself, I realized my passion for
              providing other brides with the opportunity to fully embrace and enjoy the day.
            </p>
          </div>

          <div className="about-text-wrapper second">
            <p id="about-text-block-2" ref={aboutDescription2}>
              Maddie West Events is a boutique wedding & event planning company based in Dayton, Ohio, serving
              Cincinnati, Columbus and beyond. At Maddie West Events, it is my intention to bring to life an event that
              is stress free, collaborative and properly executed. From partial planning, to finalizing the details and
              timeline execution, I’m your go to.
              <br />
              <br />
              It has been my pleasure to collaborate with countless couples, ensuring that their wedding day is nothing
              less than picturesque. I leave each and every wedding feeling so impacted by each of my couples and their
              families, most of whom are a true testimony of what marriage really is. The relationships that I have
              formed with venues and other vendors within the industry is immeasurable.
            </p>
          </div>
        </section>

        <section id="section-styled-shoot">
          <div id="styled-shoot-wrapper">
            <img
              loading="lazy"
              id="styled-shoot-image"
              src="/about/maddie_about_extra.webp"
              alt="Decor done by Maddie West"
            />
            <div id="styled-shoot-text-wrapper">
              <h6
                ref={styledShootSubHeader}
                id="styled-shoot-sub-header"
                style={{
                  color: "white",
                  opacity: 0,
                  fontSize: "0.75rem",
                  letterSpacing: "3px",
                }}
              >
                STYLED SHOOT
              </h6>
              <h4 id="styled-shoot-header" ref={styledShootHeader}>
                INTRICATE but SOFT designs that GRAVITATE towards IMAGERY, highlighting organic neutrals with pops of
                EARTHY TONES
              </h4>
              <p id="styled-shoot-description" className="justify light" ref={styledShootDescription}>
                Recently, I organized my first styled shoot. My ambition for the shoot was to captivate an environment
                where other local wedding industry vendors could collaborate; Vendors such as myself, the rental
                companies, the hair and makeup artists, the florists, the stationary designers, the photographers, the
                videographers, etc. It was my intent for the shoot to be beneficial to our businesses’ and our exposure
                within the industry.
                <br />
                <br />
                To say it went well would be an understatement. I left the shoot feeling so full of inspiration,
                gratitude, and even more motivated to build a picturesque brand. I am already in the beginning stages of
                planning the next shoot! If you’re a local vendor and you would like to be featured in the next shoot,
                please reach out to me, I’m always looking to collaborate with other industry pros.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AboutRoute;
