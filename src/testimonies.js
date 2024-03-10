
function setAnimations(elements) {
  for (const element of elements) {
    gsap.to(element, {
      opacity: 1,
      scrollTrigger: {
        trigger: element,
        start: "top bottom", // Change according to your needs
        end: "top 25%", // Change according to your needs
        scrub: true
      }
    });
  }
}

function initScript() {
  gsap.registerPlugin(ScrollTrigger);
  const timeline = gsap.timeline();
  const journalDelay = "<=.3";
  timeline.fromTo(".focused-image", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power1.out' });
  timeline.fromTo(".top-left", { y: '50px', opacity: 0 }, { y: '0', opacity: 1, duration: 0.7, ease: 'power1.out' }, '<=0.5');
  timeline.fromTo(".bottom-right", { y: '50px', opacity: 0 }, { y: '0', opacity: 1, duration: 0.7, ease: 'power1.out' }, '<=0.5');
  timeline.delay(0.4);
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
