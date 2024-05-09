
// MODULE DEPENDENCIES
import "../index.js";
import "./testimonies.scss";

import "../assets/testimony/testimony-cover.webp";

// TESTIMONY 1
import "../assets/testimony/testimony-1-1.webp";
import "../assets/testimony/testimony-1-2.webp";

// TESTIMONY 2
import "../assets/testimony/testimony-2-1.webp";
import "../assets/testimony/testimony-2-2.webp";

// TESTIMONY 3
import "../assets/testimony/testimony-3-1.webp";
import "../assets/testimony/testimony-3-2.webp";

function setAnimations(elements) {
  for (const element of elements) {
    gsap.to(element, {
      opacity: 1,
      scrollTrigger: {
        trigger: element,
        start: "top 82%", // Change according to your needs
        end: "top 50%", // Change according to your needs
        scrub: true
      }
    });
  }
}

function initScript() {
  gsap.registerPlugin(ScrollTrigger);
  const timeline = gsap.timeline();
  const journalDelay = "<=.3";
  // timeline.fromTo(".focused-image", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power1.out' });
  // timeline.fromTo(".top-left", { y: '50px', opacity: 0 }, { y: '0', opacity: 1, duration: 0.7, ease: 'power1.out' }, '<=0.5');
  // timeline.fromTo(".bottom-right", { y: '50px', opacity: 0 }, { y: '0', opacity: 1, duration: 0.7, ease: 'power1.out' }, '<=0.5');

  timeline.fromTo(".focused-image", { y: '80px', opacity: 0 }, { y: '0', opacity: 1, duration: 0.7 });
  timeline.fromTo(".top-left", { y: '80px', opacity: 0 }, { y: '0', opacity: 1, duration: 0.7 }, "0");
  timeline.fromTo(".bottom-right", { y: '80px', opacity: 0 }, { y: '0', opacity: 1, duration: 0.7 }, "0");
  timeline.delay(1.3);
  timeline.play();

  const testimonyImgs = document.querySelectorAll('.testimony-img');
  const testimonyQuotes = document.querySelectorAll('.client-testimony');
  setAnimations(testimonyImgs);
  setAnimations(testimonyQuotes);

  initialized = true;
}

export function onInit() {
  if (!initialized) {
    initScript();
  }
}

/**
 * On Destroy callback anytime barba navigates away from the page.
 */
export function onDestroy() {

  // Remove Script
  document.querySelectorAll('script').forEach(script => {
    if (script.src.endsWith('testimonies.js')) {
      script.parentNode.removeChild(script);
    }
  });

  // Remove StyleSheet
  document.querySelectorAll('link').forEach(styleSheet => {
    if (styleSheet.href.endsWith('testimonies.scss')) {
      styleSheet.parentNode.removeChild(styleSheet);
    }
  });
  initialized = false;
}

let initialized = false;
onInit();
