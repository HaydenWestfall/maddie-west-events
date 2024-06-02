import "../route_home/index.scss";
import "../videos/maddie_primary.mp4";
import "../videos/maddie_secondary.mp4";
import "../assets/home/journal_1.webp";
import "../assets/home/journal_2.webp";
import "../assets/home/journal_3.webp";
import "../assets/home/journal_4.webp";
import "../assets/home/journal_5.webp";
import "../assets/home/journal_6.webp";
import "../assets/home/journal_7.webp";
import "../assets/home/journal_8.webp";
import "../assets/home/journal_9.webp";
import "../assets/home/about_maddie.webp";
import "../assets/home/cliffside.png";
import "../assets/home/steamplant.png";
import "../assets/home/jorgensen.png";
import "../assets/home/arcade.png";
import "../assets/home/aesthetic_1.webp";
import "../assets/home/aesthetic_2.webp";
import "../assets/home/aesthetic_3.webp";
import "../assets/home/aesthetic_4.webp";

let marqueeInterval;
let windowWidth;
let index = 0;
let journalScrollAnimation;
let journalFadeOutAnimation;
let journalFadeInAnimation;

onInit(true);
setTimeout(() => {
  document.addEventListener("click", function (event) {
    const target = event.target.closest("a");
    console.log();
    if (target && target.href.includes("index")) {
      onInit(false);
    } else {
      onDestroy();
    }
  });
});

/**
 * Initializes the home route
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
    animateElementIn("#section-about-column1", "top 75%", "top 25%", true);
    animateElementIn("#section-about-column2", "top 75%", "top 25%", true);
    animateElementIn("#section-journal-subheader", "top 75%", "top 35%", true);
    animateElementIn("#section-journal-header", "top 75%", "top 35%", true);
    animateElementIn(
      "#section-journal-description",
      "top 75%",
      "top 35%",
      true
    );
    animateElementIn("#aesthetic-image-1", "top 75%", "top 35%", true);
    animateElementIn("#aesthetic-image-2", "top 75%", "top 35%", true);
    animateElementIn("#aesthetic-image-3", "top 69%", "top 31%", true);
    animateElementIn("#aesthetic-image-4", "top 75%", "top 35%", true);
    animateElementIn("#aesthetic-subheader", "top 75%", "top 35%", true);
    animateElementIn("#aesthetic-header", "top 75%", "top 35%", true);
    animateElementIn("#aesthetic-description", "top 75%", "top 35%", true);
    animateElementIn("#maddie-flowers-header", "top 75%", "top 35%", true);

    // Start video loops on page load
    initJournalSection();
    windowWidth = window.innerWidth;
    window.addEventListener("resize", journalHelper);

    loadVideos();
  }, timeout);
}

/**
 * Builds and loads the primary and secondary videos. Doing it through js allows
 * the page to load without waiting on them.
 */
function loadVideos() {
  document.getElementById("main").addEventListener("click", function () {
    document.getElementById("primary-video").children[0].play();
  });

  document
    .getElementById("maddie-flowers-section")
    .addEventListener("click", function () {
      document.getElementById("secondary-video").children[0].play();
    });
}

/**
 * GSAP animation for animating in elements.
 *
 * @param {*} id - Id of element to animate.
 * @param {*} scrub - Should animation follow scroll position.
 */
export function animateElementIn(id, start, end, scrub) {
  gsap.fromTo(
    id,
    { opacity: 0, y: 30 },
    {
      y: 0,
      opacity: 1,
      scrollTrigger: { trigger: id, start: start, end: end, scrub: scrub },
    }
  );
}

/**
 *
 */
function journalHelper() {
  if (window.innerWidth != windowWidth) {
    windowWidth = window.innerWidth;
    initJournalSection();
  }
}

/**
 * Determine if journal section should fade images or marquee images
 */
export function initJournalSection() {
  const indexSubheader = document.getElementById("main-subheader");
  const aboutHeader = document.getElementById("section-about-header");
  const journalCarousel = document.getElementById("section-journal-images");
  const journalImages = Array.from(
    document.getElementById("section-journal-images").children
  );

  clearInterval(marqueeInterval);
  if (journalScrollAnimation) {
    journalScrollAnimation.kill();
    document.getElementById("section-journal-images").style.transform = "unset";
  }

  if (document.documentElement.clientWidth > 768) {
    if (journalFadeInAnimation) {
      journalFadeInAnimation.kill();
    }
    if (journalFadeOutAnimation) {
      journalFadeOutAnimation.kill();
    }

    indexSubheader.innerHTML = "WEDDING AND EVENT COORDINATOR";
    aboutHeader.innerHTML =
      "The SUCCESS of an EVENT lies within the CAREFUL CONSIDERATION of its DETAILS";
    journalCarousel.classList.remove("fade-images");
    journalImages.forEach((journalImage) => {
      journalImage.style.opacity = 1;
    });
    journalScrollAnimation = gsap.fromTo(
      "#section-journal-images",
      {
        x: "-15%",
      },
      {
        ease: "power1.out",
        x: "-30%",
        scrollTrigger: {
          trigger: "#section-journal-images",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  } else {
    indexSubheader.innerHTML = "EVENT COORDINATOR";
    aboutHeader.innerHTML =
      "The SUCCESS of an EVENT lies within the CONSIDERATION of its DETAILS";
    journalCarousel.classList.add("fade-images");
    journalImages.forEach((journalImage) => {
      journalImage.style.opacity = 0;
    });

    marqueeInterval = setInterval(() => {
      fadeImages();
    }, 3000);
  }
}

/**
 * Journal images will fade in and out
 */
export function fadeImages() {
  const journalImages = Array.from(
    document.getElementById("section-journal-images").children
  );
  journalFadeOutAnimation = gsap.to(journalImages[index], {
    opacity: 0,
    duration: 2,
  });
  index = index == journalImages.length - 1 ? 0 : index + 1;
  journalFadeInAnimation = gsap.to(journalImages[index], {
    opacity: 1,
    duration: 2,
  });
}

/**
 * On Destroy callback anytime barba navigates away from the page.
 */
export function onDestroy() {
  // Stop the interval
  clearInterval(marqueeInterval);
  window.removeEventListener("resize", journalHelper);
}
