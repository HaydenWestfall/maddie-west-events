import "../route_home/index.scss";
import "../route_about/about.scss";
import "../route_testimonies/testimonies.scss";
import "../route_packages/packages.scss";
import "../route_journal/journal.scss";
import "../route_contact/contact.scss";
import "../assets/packages/month_of_package.webp";
import "../assets/packages/final_planning_package.webp";
import "../assets/packages/partial_planning_package.webp";

let timeline = gsap.timeline();
onInit(true);
setTimeout(() => {
  document.addEventListener("click", function (event) {
    const target = event.target.closest("a");
    if (target && target.href.includes("packages")) {
      onInit(false);
    }
  });
});

/**
 * Intializes the packages page
 *
 * @param {*} initialScriptLoad - Is this the initial page load.
 */
function onInit(initialScriptLoad) {
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
    timeline.fromTo(
      ".header",
      { y: "80px", opacity: 0 },
      { y: "0", opacity: 1, duration: 0.7 }
    );
    timeline.fromTo(
      ".sub-header",
      { y: "80px", opacity: 0 },
      { y: "0", opacity: 1, duration: 0.7 },
      "0"
    );

    const packageElements = document.querySelectorAll(".package-wrapper");
    for (let i = 0; i < packageElements.length; i++) {
      if (i === 0) {
        timeline.fromTo(
          packageElements[i],
          { y: "80px", opacity: 0 },
          { y: "0", opacity: 1, duration: 0.7 },
          "<=0"
        );
      } else {
        gsap.fromTo(
          packageElements[i],
          { y: "200px", opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: packageElements[i],
              start: "top bottom",
              end: "top 30%",
              scrub: true,
            },
          }
        );
      }
    }

    timeline.play();
  }, timeout);
}

/**
 * On Destroy callback anytime barba navigates away from the page.
 */
export function onDestroy() {
  timeline.kill();
}
