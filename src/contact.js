
/**
 * On Destroy callback anytime barba navigates away from the page.
 */
function initScript() {
  gsap.fromTo("#contact-header",
    { y: '100px', opacity: 0 },
    { y: '0', opacity: 1, duration: 0.7, delay: 0.3, ease: 'power1.out' }
  );
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
  // Remove Script
  document.querySelectorAll('script').forEach(script => {
    if (script.src.endsWith('contact-page.js')) {
      script.parentNode.removeChild(script);
    }
  });

  // Remove StyleSheet
  document.querySelectorAll('link').forEach(styleSheet => {
    if (styleSheet.href.endsWith('contact.scss')) {
      styleSheet.parentNode.removeChild(styleSheet);
    }
  });
  initialized = false;
}

let initialized = false;
onInit();
