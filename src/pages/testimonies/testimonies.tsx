import "./testimonies.scss";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMWETransitionContext } from "../../shared/route-transition/TransitionProvider";
import { componentOnLoadAnimationDelay, TransitionState } from "../../shared/utility";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const TestimoniesRoute: React.FC = () => {
  const { isTransitioning } = useMWETransitionContext();
  const testimoniesContainer = useRef<HTMLDivElement | null>(null);
  const headerBg = useRef<HTMLImageElement | null>(null);
  const headerTopLeft = useRef<HTMLDivElement | null>(null);
  const headerBottomLeft = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (isTransitioning === TransitionState.DoneTransitioning) {
        const timeline = gsap.timeline({ delay: componentOnLoadAnimationDelay });
        timeline.to(headerBg.current, { opacity: 1, duration: 0.7 });
        timeline.to(headerTopLeft.current, { y: "0", opacity: 1, duration: 0.7 }, "0");
        timeline.to(headerBottomLeft.current, { y: "0", opacity: 1, duration: 0.7 }, "0");
        timeline.play();
      }
    },
    { dependencies: [isTransitioning], scope: testimoniesContainer }
  );

  return (
    <main data-barba="wrapper">
      <div
        ref={testimoniesContainer}
        data-barba="container"
        data-barba-namespace="testimonies"
        className="testimonies_route"
      >
        <div className="testimonies-page">
          <div className="image-wrapper">
            <div ref={headerTopLeft} className="header top-left">
              WHAT CLIENTS
            </div>
            <div ref={headerBottomLeft} className="header bottom-right">
              ARE SAYING
            </div>
            <img ref={headerBg} className="focused-image" src="/testimony/testimony-cover.webp" />
          </div>
        </div>

        <div className="testimony">
          <div className="testimony-wrapper">
            <div className="client-images">
              <div className="image-wrapper">
                <img
                  className="testimony-img"
                  loading="lazy"
                  src="/testimony/testimony-2-1.webp"
                  id="testimony-2-image-1"
                />
              </div>
              <div className="image-wrapper">
                <img
                  className="testimony-img"
                  loading="lazy"
                  src="/testimony/testimony-2-2.webp"
                  id="testimony-2-image-2"
                />
              </div>
            </div>
            <div className="client-testimony-wrapper">
              <div id="testimony-2-quote" className="client-testimony">
                <span className="client-text">OLIVIA + CALEB | 09.02.2023</span>
                <p className="testimony-quote">
                  “I cannot say enough good things about Maddie! Because of her our wedding weekend went flawlessly. She
                  was there during our rehearsal and has such a wealth of knowledge that allowed us to tailor our
                  ceremony to what we wanted it to be. On the wedding day, she totally nailed our vision and was
                  amazing! When I walked into the reception area I was so taken back by how beautiful and perfect it
                  was.
                  <br />
                  <br />
                  Maddie handled everything with such a calm, laid back demeanor which I'm sure many many brides can
                  appreciate. She was very responsive and reached out if she had any questions. Our family and friends
                  even talked about Maddie after our wedding and how amazing she was. If you're thinking of having a day
                  of coordinator, Maddie is your girl!”
                </p>
                <span className="client-name">- Olivia Gannelli</span>
              </div>
            </div>
          </div>
        </div>

        <div className="testimony">
          <div className="testimony-wrapper middle">
            <div className="client-testimony-wrapper middle">
              <div id="testimony-3-quote" className="client-testimony">
                <span className="client-text">JULIA + COLE | 08.25.2023</span>
                <p className="testimony-quote">
                  “Maddie was nothing short of amazing! She was on top of everything from start to finish; Set up of the
                  reception, the ceremony space, and even ran the rehearsal. She made sure Cole and I were at ease and
                  she took care of the rest. Even when decisions were needing to be made, she made sure our needs/wants
                  were the top priority.
                  <br />
                  <br />
                  Anytime I had a question during our day, her answer was “yes, it’s good to go!” I couldn’t be more
                  thankful for all of her hard work and dedication to us on our big day. Do not hesitate to have her be
                  a part of your wedding day!”
                </p>
                <span className="client-name">- Julia Johnson</span>
              </div>
            </div>
            <div className="client-images">
              <div className="image-wrapper">
                <img
                  loading="lazy"
                  className="testimony-img"
                  id="testimony-3-image-1"
                  src="/testimony/testimony-3-1.webp"
                />
              </div>
              <div className="image-wrapper">
                <img
                  loading="lazy"
                  className="testimony-img"
                  id="testimony-3-image-2"
                  src="/testimony/testimony-3-2.webp"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="testimony">
          <div className="testimony-wrapper">
            <div className="client-images">
              <div className="image-wrapper">
                <img
                  className="testimony-img"
                  id="testimony-1-image-1"
                  loading="lazy"
                  src="/testimony/testimony-1-1.webp"
                />
              </div>
              <div className="image-wrapper">
                <img
                  className="testimony-img"
                  id="testimony-1-image-2"
                  loading="lazy"
                  src="/testimony/testimony-1-2.webp"
                />
              </div>
            </div>
            <div className="client-testimony-wrapper">
              <div id="testimony-1-quote" className="client-testimony">
                <span className="client-text">ANNA + KODI | 10.14.2023</span>
                <p className="testimony-quote">
                  Maddie was a God send! She went above and beyond to ensure our day was picture and memory perfect.
                  From setting up to tearing down, she did not miss a beat. Our venue space looked like a fairy tale,
                  and the ceremony set up was nothing short of magical. She is wildly creative and when you allow her
                  free reign to do what she does best, she 100% exceeds expectations.
                  <br />
                  <br />
                  As the bride, her services allowed me to be calm and present for my big day. I could enjoy time with
                  friends and family and my husband without fear of keeping things in order or on time. We cannot
                  recommend her services enough. If we had to do it all over again there are a few things we would
                  change for our day, but she is not one of them. From a small intimate event to the largest grand
                  nuptials, SHE MAKES THE DAY!”
                </p>
                <span className="client-name">- Anna Roshak</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TestimoniesRoute;
