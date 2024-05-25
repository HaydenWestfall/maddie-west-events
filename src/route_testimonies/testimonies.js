import "./testimonies.scss";
import "../assets/testimony/testimony-cover.webp";
import "../assets/testimony/testimony-1-1.webp";
import "../assets/testimony/testimony-1-2.webp";
import "../assets/testimony/testimony-2-1.webp";
import "../assets/testimony/testimony-2-2.webp";
import "../assets/testimony/testimony-3-1.webp";
import "../assets/testimony/testimony-3-2.webp";

let timeline = gsap.timeline();
onInit(true);
setTimeout(() => {
  document.addEventListener('click', function (event) {
    const target = event.target.closest('a');
    if (target && target.href.includes('testimonies')) {
      onInit(false);
    } else {
      timeline.kill();
    }
  });
});

/**
 * Initializes the testimonies page
 * 
 * @param {*} initialScriptLoad - Determines if this is the initial page load
 */
function onInit(initialScriptLoad) {
  console.log('testimoneis initi')
  let timeout;
  if (initialScriptLoad && !window.barbaIsActive) {
    // Initial page load. wait on page load and run animation.
    timeout = 250;
  } else if (initialScriptLoad && window.barbaIsActive) {
    // Initial page load when routed to by website. Delay half of barba animation.
    timeout = 1200;
  } else {
    // Navigating back to the same page delay the whole barba animation.
    timeout = 2400;
  }

  setTimeout(() => {
    gsap.registerPlugin(ScrollTrigger);
    timeline = gsap.timeline();
    timeline.to(".focused-image", { y: '0', opacity: 1, duration: 0.7 });
    timeline.to(".top-left", { y: '0', opacity: 1, duration: 0.7 }, "0");
    timeline.to(".bottom-right", { y: '0', opacity: 1, duration: 0.7 }, "0");
    timeline.play();

    const testimonyImgs = document.querySelectorAll('.testimony-img');
    const testimonyQuotes = document.querySelectorAll('.client-testimony');
    setAnimations(testimonyImgs);
    setAnimations(testimonyQuotes);
  }, timeout);
}

function setAnimations(elements) {
  for (const element of elements) {
    gsap.to(element, { opacity: 1, scrollTrigger: { trigger: element, start: "top 82%", end: "top 50%", scrub: true } });
  }
}
