
import "../index.js";
import "./packages.scss";

// MODULE DEPENDENCIES
import "../assets/packages/month_of_package.webp";
import "../assets/packages/final_planning_package.webp";
import "../assets/packages/partial_planning_package.webp";


function initScript() {
  gsap.registerPlugin(ScrollTrigger);
  const timeline = gsap.timeline();
  timeline.fromTo(".header", { y: '80px', opacity: 0 }, { y: '0', opacity: 1, duration: 0.7 });
  timeline.fromTo(".sub-header", { y: '80px', opacity: 0 }, { y: '0', opacity: 1, duration: 0.7 }, "0");

  const packageElements = document.querySelectorAll('.package-wrapper');
  for (let i = 0; i < packageElements.length; i++) {
    if (i === 0) {
      timeline.fromTo(packageElements[i], { y: '80px', opacity: 0 }, { y: '0', opacity: 1, duration: 0.7 }, "<=0");
    } else {
      gsap.fromTo(packageElements[i],
        { y: '200px', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: packageElements[i],
            start: "top bottom", // Change according to your needs
            end: "top 30%", // Change according to your needs
            scrub: true
          }
        });
    }
  }

  timeline.delay(1.4);
  timeline.play();

  initialized = true;
}

export function onInit() {
  if (!initialized) {
    // initScript();
  }
}

/**
 * On Destroy callback anytime barba navigates away from the page.
 */
export function onDestroy() {

  // Remove Script
  document.querySelectorAll('script').forEach(script => {
    if (script.src.endsWith('packages.js')) {
      script.parentNode.removeChild(script);
    }
  });

  // Remove StyleSheet
  document.querySelectorAll('link').forEach(styleSheet => {
    if (styleSheet.href.endsWith('packages.scss')) {
      styleSheet.parentNode.removeChild(styleSheet);
    }
  });
  initialized = false;
}

let initialized = false;
onInit();
