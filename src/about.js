
/**
 * On Destroy callback anytime barba navigates away from the page.
 */
function initScript() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.to("#client-quote", {
    translateY: -100,
    scrollTrigger: {
      trigger: "#client-quote",
      start: "top bottom", // Change according to your needs
      end: "top 80%", // Change according to your needs
      scrub: false
    }
  });

  gsap.to("#about-maddie-image", {
    translateY: -100,
    scrollTrigger: {
      trigger: "#about-maddie-image",
      start: "top bottom", // Change according to your needs
      end: "top 80%", // Change according to your needs
      scrub: true
    }
  });

  gsap.to("#about-text-block-1", {
    translateY: -100,
    opacity: 1,
    scrollTrigger: {
      trigger: "#about-text-block-1",
      start: "top 80%", // Change according to your needs
      end: "top center", // Change according to your needs
      scrub: true
    }
  });

  gsap.to("#about-text-block-2", {
    translateY: -100,
    opacity: 1,
    scrollTrigger: {
      trigger: "#about-text-block-2",
      start: "top 80%", // Change according to your needs
      end: "top center", // Change according to your needs
      scrub: true
    }
  });


  gsap.fromTo("#more-section-image", {
    y: 50,
    opacity: 0,
  }, {
    translateY: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: "#more-section-image",
      start: "top bottom", // Change according to your needs
      end: "top 90%", // Change according to your needs
      scrub: true
    }
  });

  gsap.fromTo("#more-section-sub-header", {
    y: 50,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: "#more-section-sub-header",
      start: "top 80%", // Change according to your needs
      end: "top 60%", // Change according to your needs
      scrub: true
    }
  });


  gsap.fromTo("#more-section-header", {
    y: 50,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: "#more-section-header",
      start: "top 80%", // Change according to your needs
      end: "top center", // Change according to your needs
      scrub: true
    }
  });


  gsap.fromTo("#more-section-description", {
    y: 50,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: "#more-section-description",
      start: "top 80%", // Change according to your needs
      end: "top center", // Change according to your needs
      scrub: true
    }
  });

  initialized = true;
}

/**
 * On Destroy callback anytime barba navigates away from the page.
 */
export function onInit() {
  if (!initialized) {
    initScript();
  }
}

/**
 * On Destroy callback anytime barba navigates away from the page.
 */
export function onDestroy() {
  window.removeEventListener('resize', switchImage, false);

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

