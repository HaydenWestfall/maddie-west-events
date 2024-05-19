
import "../route_about/about.scss";
import "../videos/maddie_main_lr.mp4";
import "../assets/about/maddie_1.webp";
import "../assets/about/maddie_about_extra.webp";

onInit(true);
setTimeout(() => {
  window.navigation.addEventListener("navigate", (event) => {
    if (event.destination.url.includes('about')) {
      onInit(false);
    }
  });
});

/**
 * Initializes the about component
 * 
 * @param {*} initialScriptLoad - Is this the initial page load
 */
export function onInit(initialScriptLoad) {
  let timeout;
  if (initialScriptLoad && !window.barbaIsActive) {
    // Initial page load. wait on page load and run animation.
    timeout = 0;
  } else if (initialScriptLoad && window.barbaIsActive) {
    // Initial page load when routed to by website. Delay half of barba animation.
    timeout = 1000;
  } else {
    // Navigating back to the same page delay the whole barba animation.
    timeout = 2000;
  }

  setTimeout(() => {
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
  }, timeout);
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

