
import "../index.js";
import "./about.scss";

// COMPONENT SPECIFIC
import "../videos/maddie_main_lr.mp4";
import "../assets/about/maddie_1.webp";
import "../assets/about/maddie_about_extra.webp";

/**
 * Initializes the about component
 */
export function onInit() {
  if (!initialized) {
    gsap.registerPlugin(ScrollTrigger);
    animateElementIn('#client-quote', true);
    animateElementIn('#client-name', true);
    animateElementIn('#about-maddie-image', true);
    animateElementIn('#about-text-block-1', true);
    animateElementIn('#about-text-block-2', true);
    animateElementIn('#more-section-image', true);
    animateElementIn('#more-section-sub-header', true);
    animateElementIn('#more-section-header', true);
    animateElementIn('#more-section-description', true);

    // Start video loops on page load
    const videos = Array.from(document.getElementsByTagName('video'));
    videos.forEach(video => video.play());

    initialized = true;
  }
}

/**
 * GSAP animation for animating in an element
 */
export function animateElementIn(id, scrub) {
  gsap.fromTo(id,
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: id,
        start: "top 80%",
        end: "top 50%",
        scrub: scrub
      }
    });
}

/**
 * On Destroy callback anytime barba navigates away from the page.
 */
export function onDestroy() {
  try {
    window.removeEventListener('resize', switchImage, false);
  } catch (e) {
    console.log('About page switchImage listener never registered')
  }

  // Remove Script
  document.querySelectorAll('script').forEach(script => {
    if (script.src.endsWith('about.js')) {
      script.parentNode.removeChild(script);
    }
  });

  // Remove StyleSheet
  document.querySelectorAll('link').forEach(styleSheet => {
    if (styleSheet.href.endsWith('about.scss')) {
      styleSheet.parentNode.removeChild(styleSheet);
    }
  });
  initialized = false;
}

let initialized = false;
onInit();

