
import "../route_about/about.scss";
import "../videos/about_maddie.mp4";
import "../assets/about/maddie_1.webp";
import "../assets/about/maddie_about_extra.webp";

onInit(true);
setTimeout(() => {
  document.addEventListener('click', function (event) {
    const target = event.target.closest('a');
    if (target && target.href.includes('about')) {
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
    // animateElementIn('#client-quote', true);
    // animateElementIn('#client-name', true);
    animateElementIn('.about-client-quote', "top 80%", "top 40%", true);
    // animateElementIn('#about-maddie-image', "top 80%", "top 40%", false);
    animateElementIn('#about-text-block-1', "top 80%", "top 40%", true);
    animateElementIn('#about-text-block-2', "top 80%", "top 40%", true);
    animateElementIn('#more-section-sub-header', "top 80%", "top 40%", true);
    animateElementIn('#more-section-header', "top 80%", "top 40%", true);
    animateElementIn('#more-section-description', "top 80%", "top 40%", true);

    gsap.fromTo("#about-maddie-image",
      { y: 60, opacity: 0 },
      {
        y: 0, // End position,
        opacity: 1,
        duration: 0.6, // Duration of 1 second
        ease: "power1.out", // Ease function
        scrollTrigger: {
          trigger: "#about-maddie-image", // Element that triggers the animation
          start: "top 90%", // Start the animation when the top of the trigger element is at 80% of the viewport height
        }
      });

    gsap.fromTo("#more-section-image",
      { y: 60, opacity: 0 },
      {
        y: 0, // End position,
        opacity: 1,
        duration: 0.6, // Duration of 1 second
        ease: "power1.out", // Ease function
        scrollTrigger: {
          trigger: "#more-section-image", // Element that triggers the animation
          start: "top 100%", // Start the animation when the top of the trigger element is at 80% of the viewport height
        }
      });

    // Start video loops on page load
    loadVideo();
  }, timeout);
}

/**
 * Builds and loads the primary and secondary videos. Doing it through js allows
 * the page to load without waiting on them.
 */
function loadVideo() {
  var aboutVideoContainer = document.getElementById('about-video');
  var aboutVideo = document.createElement('video');
  // aboutVideo.src = './videos/about_maddie.mp4';
  // aboutVideo.autoplay = true;
  // aboutVideo.loop = true;
  // aboutVideo.muted = true;
  // aboutVideo.playsinline = true;
  // aboutVideoContainer.appendChild(aboutVideo);
  // aboutVideoContainer.classList.remove('hidden');


  const videos = Array.from(document.getElementsByTagName('video'));
  videos.forEach(video => {
    video.play().catch(function (error) {
      console.error('Error attempting to play the primary video:', error);
    });
  })
}

/**
 * GSAP animation for animating in an element
 */
export function animateElementIn(id, start, end, scrub) {
  gsap.fromTo(id,
    {
      opacity: 0,
      y: 50
    },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: id,
        start: start,
        end: end,
        scrub: scrub
      }
    });
}

