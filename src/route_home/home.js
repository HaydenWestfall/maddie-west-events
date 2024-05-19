import "../route_home/index.scss";
import "../videos/maddie_main_1.mp4";
import "../assets/home/journal_1.JPG";
import "../assets/home/journal_2.JPG";
import "../assets/home/journal_3.JPG";
import "../assets/home/journal_4.JPG";
import "../assets/home/journal_5.JPG";
import "../assets/home/journal_6.JPG";
import "../assets/home/journal_7.JPG";
import "../assets/home/journal_8.JPG";
import "../assets/home/journal_9.JPG";
import "../assets/home/about_maddie.webp";
import "../assets/vendors/cliffside.png";
import "../assets/vendors/steamplant.png";
import "../assets/vendors/jorgensen.png";
import "../assets/vendors/arcade.png";
import "../assets/aesthetic/aesthetic_1.webp";
import "../assets/aesthetic/aesthetic_2.webp";
import "../assets/aesthetic/aesthetic_3.webp";
import "../assets/aesthetic/aesthetic_4.webp";

let marqueeInterval;
let windowWidth;
let index = 0;
onInit(true);
setTimeout(() => {
  window.navigation.addEventListener("navigate", (event) => {
    if (event.destination.url.includes('index')) {
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
    animateElementIn('#column1', true);
    animateElementIn('#column2', true);
    animateElementIn('#journal-subheader', true);
    animateElementIn('#journal-header', true);
    animateElementIn('#journal-description', true);
    animateElementIn('.vendor-list', true);
    animateElementIn('#aesthetic-image-1', true);
    animateElementIn('#aesthetic-image-2', true);
    animateElementIn('#aesthetic-image-3', true);
    animateElementIn('#aesthetic-image-4', true);
    animateElementIn('#aesthetic-subheader', true);
    animateElementIn('#aesthetic-header', true);
    animateElementIn('#aesthetic-description', true);
    animateElementIn('#maddie-flowers-header', true);

    // Start video loops on page load
    initJournalSection();
    windowWidth = window.innerWidth;
    window.addEventListener('resize', journalHelper);


    var videoContainer = document.getElementById('video-container');
    var video = document.createElement('video');
    video.src = './videos/maddie_main_1.mp4';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsinline = true;
    videoContainer.appendChild(video);
    videoContainer.classList.remove('hidden');

    video.play().catch(function (error) {
      console.error('Error attempting to play the video:', error);
    });

    // setTimeout(() => {
    //   const videos = Array.from(document.getElementsByTagName('video'));
    //   videos.forEach(video => video.play());
    // }, 1000);
  }, timeout);
}

/**
 * GSAP animation for animating in elements.
 * 
 * @param {*} id - Id of element to animate.
 * @param {*} scrub - Should animation follow scroll position.
 */
export function animateElementIn(id, scrub) {
  gsap.fromTo(id,
    { opacity: 0, y: 30 },
    { y: 0, opacity: 1, scrollTrigger: { trigger: id, start: "top 70%", end: "top 50%", scrub: scrub } }
  );
}

/**
 * 
 */
function journalHelper() {
  if (window.innerWidth != windowWidth) {
    windowWidth = window.innerWidth;
    initJournalSection()
  }
}

/**
 * Determine if journal section should fade images or marquee images
 */
export function initJournalSection() {
  const images = Array.from(document.getElementById('journal-carousel').children);
  const journalCarousel = document.getElementById('journal-carousel');
  const indexSubheader = document.getElementById('main-subheader');
  const aboutHeader = document.getElementById('about-maddie-header');

  clearInterval(marqueeInterval);

  if (document.documentElement.clientWidth > 768) {
    indexSubheader.innerHTML = 'WEDDING AND EVENT COORDINATOR';
    aboutHeader.innerHTML = 'The SUCCESS of an EVENT lies within the CAREFUL CONSIDERATION of its DETAILS';
    journalCarousel.classList.add('marquee-images');
    journalCarousel.classList.remove('fade-images');
    images.forEach(image => { image.style.opacity = 1 });
  } else {
    indexSubheader.innerHTML = 'EVENT COORDINATOR';
    aboutHeader.innerHTML = 'The SUCCESS of an EVENT lies within the CONSIDERATION of its DETAILS';
    journalCarousel.classList.add('fade-images');
    journalCarousel.classList.remove('marquee-images');
    images.forEach(image => { image.style.opacity = 0 });

    marqueeInterval = setInterval(() => {
      fadeImages();
    }, 3000);
  }
}

/**
 * Journal images will fade in and out
 */
export function fadeImages() {
  let images = Array.from(document.getElementById('journal-carousel').children);
  images.splice(-3);
  gsap.to(images[index], { opacity: 1, duration: 2 });
  index = (index == images.length - 1) ? 0 : (index + 1);
}

/**
 * On Destroy callback anytime barba navigates away from the page.
 */
export function onDestroy() {
  // Stop the interval
  clearInterval(marqueeInterval);
  window.removeEventListener('resize', journalHelper);
}
