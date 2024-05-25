import "../route_journal/journal.scss";
import "../assets/journal/journal_header_3.JPG";
import "../assets/journal/journal_header_1.JPG";
import "../assets/journal/journal_header_2.JPG";
import "../assets/journal/journal_header_4.JPG";
import "../assets/journal/journal_header_5.JPG";
import "../assets/journal/journal_entry_1_1.webp";
import "../assets/journal/journal_entry_1_2.webp";
import "../assets/journal/journal_entry_1_3.webp";
import "../assets/journal/journal_entry_2_1.webp";
import "../assets/journal/journal_entry_2_2.webp";
import "../assets/journal/journal_entry_2_3.webp";
import "../assets/journal/journal_entry_3_1.webp";
import "../assets/journal/journal_entry_3_2.webp";
import "../assets/journal/journal_entry_3_3.webp";

let timeline = gsap.timeline();
let fadeInterval;
let index = 0;

onInit(true);
setTimeout(() => {
  document.addEventListener('click', function (event) {
    const target = event.target.closest('a');
    if (target && target.href.includes('journal')) {
      onInit(false);
    } else {
      onDestroy();
    }
  });
});

/**
 * Intializes the journal section
 * 
 * @param {*} initialScriptLoad - Is this the initial page load
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
    if (document.documentElement.clientWidth > 768) {
      initScriptDesktop();
    } else {
      initScriptMobile();
    }
  }, timeout);
}

/**
 * Initilize this script
 */
function initScriptDesktop() {
  const imageAnimationDuration = 0.5;
  let imageWidth = '';
  imageWidth = (document.documentElement.clientWidth > 768) ? '100%' : '7rem';

  timeline = gsap.timeline();
  const journalDelay = "<=.15";
  timeline.fromTo("#journal-1", { opacity: 0, width: '15%' }, { opacity: 1, width: imageWidth, duration: imageAnimationDuration });
  timeline.fromTo("#journal-2", { opacity: 0, width: '15%' }, { opacity: 1, width: imageWidth, duration: imageAnimationDuration }, journalDelay);
  timeline.fromTo("#journal-3", { opacity: 0, width: '15%' }, { opacity: 1, width: imageWidth, duration: imageAnimationDuration }, journalDelay);
  timeline.fromTo("#journal-4", { opacity: 0, width: '15%' }, { opacity: 1, width: imageWidth, duration: imageAnimationDuration }, journalDelay);
  timeline.fromTo("#journal-5", { opacity: 0, width: '15%' }, { opacity: 1, width: imageWidth, duration: imageAnimationDuration }, journalDelay);
  timeline.play();

  setJournalAnimations();
}


function initScriptMobile() {
  gsap.registerPlugin(ScrollTrigger);
  timeline = gsap.timeline();
  timeline.fromTo(".journal-images", { y: '80px', opacity: 0 }, { y: '0', opacity: 1, duration: 1.2 });
  timeline.fromTo(".journal-header", { y: '80px', opacity: 0 }, { y: '0', opacity: 1, duration: 1.2 }, "0");
  timeline.play();

  fadeInterval = setInterval(() => {
    fadeImagesJournal();
  }, 4000);
}

function fadeImagesJournal() {
  const journalImagesContainer = document.getElementById('journal-images-container');
  const imageArray = journalImagesContainer.querySelectorAll('div');
  const currentImage = imageArray[index];
  const nextImage = imageArray[(index === 4) ? 0 : (index + 1)];

  gsap.to(currentImage, { opacity: 0, ease: 'none', duration: 0.75 });
  gsap.to(nextImage, { opacity: 1, ease: 'none', duration: 0.75 });

  index = (index === 4) ? 0 : (index + 1);
}

function setJournalAnimations() {
  const ids = [
    "#journal-entry-1-1",
    "#journal-entry-1-2",
    "#journal-entry-1-3",
    "#journal-entry-2-1",
    "#journal-entry-2-2",
    "#journal-entry-2-3",
    "#journal-entry-3-1",
    "#journal-entry-3-2",
    "#journal-entry-3-3"
  ];

  for (let i = 0; i < ids.length; i++) {
    const indexFactor = i % 3;
    const start = 100 - (indexFactor * 15);
    const end = 80 - (indexFactor * 25);
    gsap.fromTo(ids[i],
      { opacity: 0, translateY: 40 },
      { opacity: 1, translateY: 0, scrollTrigger: { trigger: ids[i], start: `top ${start}%`, end: `top ${end}%`, scrub: true } }
    );
  }
}

/**
 * On Destroy callback anytime barba navigates away from the page.
 */
export function onDestroy() {
  timeline.kill();
  clearInterval(fadeInterval);
}
