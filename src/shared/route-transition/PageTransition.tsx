import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./PageTransition.scss";
import gsap from "gsap";
import { useMWETransitionContext } from "./TransitionProvider";
import { TransitionState } from "../utility";

const PageTransition: React.FC<{ children: (handleNavigation: (path: string) => void) => React.ReactNode }> = ({
  children,
}) => {
  const { isTransitioning, appInitialized, updateTransitioningState, initializeApplication } =
    useMWETransitionContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState("");
  const [nextRoute, setNextRoute] = useState<string | null>(null);
  const transitionTextRef = useRef(null);

  useEffect(() => {
    if (nextRoute || !appInitialized) {
      const transitionText = nextRoute ?? location.pathname;
      updateTransitioningState(TransitionState.Transitioning);
      setDisplayText(transitionText.replace("/", "") || "MADDIE WEST EVENTS");
    }
  }, [nextRoute]);

  const handleNavigation = (path: string) => {
    if (path !== location.pathname) {
      setNextRoute(path);
    }
  };

  /**
   * When the cover page is on screen, do the following to create a smooth UX between pages:
   * - Animate transition text onto cover page
   * - Navigate to new page in background
   * - Auto Scroll user to top
   * - Reset state
   */
  const loadNewPage = () => {
    gsap.fromTo(transitionTextRef.current, { opacity: 0, y: "20px" }, { opacity: 1, y: 0, duration: 0.8 });
    setTimeout(() => {
      navigate(nextRoute!);
      window.scrollTo({ top: 0, behavior: "instant" });
      setNextRoute(null);
      updateTransitioningState(TransitionState.DoneTransitioning);
      initializeApplication();
    }, 1350);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isTransitioning === TransitionState.Transitioning && (
          <motion.div
            key={location.pathname}
            id="transition-wrapper"
            initial={{ y: appInitialized ? "100%" : "0" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.725, ease: [0.75, 0.03, 0.86, 0.06] }}
            onAnimationComplete={(animationState: any) => {
              // If y equals 0, the cover is on screen and we need to show the
              // route text, and animate to the new page.
              if (animationState["y"] === 0) {
                loadNewPage();
              }
            }}
          >
            <h1 ref={transitionTextRef} style={{ color: "white", opacity: 0 }}>
              {displayText.toUpperCase()}
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
      {children(handleNavigation)}
    </>
  );
};

export default PageTransition;
