
import "../index.js";
import "../route_home/index.scss";
import "../route_about/about.scss";
import "../route_testimonies/testimonies.scss";
import "../route_packages/packages.scss";
import "../route_journal/journal.scss";
import "../route_contact/contact.scss";

// MODULE DEPENDENCIES
import "../assets/journal/journal_header_3.JPG";
import "../assets/journal/journal_header_1.JPG";
import "../assets/journal/journal_header_2.JPG";
import "../assets/journal/journal_header_4.JPG";
import "../assets/journal/journal_header_5.JPG";

// Journal Entry 1
import "../assets/journal/journal_entry_1_1.webp";
import "../assets/journal/journal_entry_1_2.webp";
import "../assets/journal/journal_entry_1_3.webp";

// Journal Entry 2
import "../assets/journal/journal_entry_2_1.webp";
import "../assets/journal/journal_entry_2_2.webp";
import "../assets/journal/journal_entry_2_3.webp";

// Journal Entry 3
import "../assets/journal/journal_entry_3_1.webp";
import "../assets/journal/journal_entry_3_2.webp";
import "../assets/journal/journal_entry_3_3.webp";

/**
 * Initilize this script
 */
function initScriptDesktop() {
  const imageAnimationDuration = 0.5;
  let imageWidth = '';
  imageWidth = (document.documentElement.clientWidth > 768) ? '100%' : '7rem';

  const journalTimeline = gsap.timeline();
  const journalDelay = "<=.15";
  journalTimeline.fromTo("#journal-1", { opacity: 0, width: '15%' }, { opacity: 1, width: imageWidth, duration: imageAnimationDuration });
  journalTimeline.fromTo("#journal-2", { opacity: 0, width: '15%' }, { opacity: 1, width: imageWidth, duration: imageAnimationDuration }, journalDelay);
  journalTimeline.fromTo("#journal-3", { opacity: 0, width: '15%' }, { opacity: 1, width: imageWidth, duration: imageAnimationDuration }, journalDelay);
  journalTimeline.fromTo("#journal-4", { opacity: 0, width: '15%' }, { opacity: 1, width: imageWidth, duration: imageAnimationDuration }, journalDelay);
  journalTimeline.fromTo("#journal-5", { opacity: 0, width: '15%' }, { opacity: 1, width: imageWidth, duration: imageAnimationDuration }, journalDelay);
  journalTimeline.delay(1.4);
  journalTimeline.play();

  setJournalAnimations();
  initialized = true;
}

let index = 0;

function initScriptMobile() {
  gsap.registerPlugin(ScrollTrigger);
  const timeline = gsap.timeline();
  const journalDelay = "<=.3";
  // timeline.fromTo(".focused-image", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power1.out' });
  // timeline.fromTo(".top-left", { y: '50px', opacity: 0 }, { y: '0', opacity: 1, duration: 0.7, ease: 'power1.out' }, '<=0.5');
  // timeline.fromTo(".bottom-right", { y: '50px', opacity: 0 }, { y: '0', opacity: 1, duration: 0.7, ease: 'power1.out' }, '<=0.5');

  timeline.fromTo(".journal-images", { y: '80px', opacity: 0 }, { y: '0', opacity: 1, duration: 1.2 });
  timeline.fromTo(".journal-header", { y: '80px', opacity: 0 }, { y: '0', opacity: 1, duration: 1.2 }, "0");
  timeline.delay(2);
  timeline.play();

  fadeInterval = setInterval(() => {
    fadeImagesJournal();
  }, 4000);

  initialized = true;
}

function fadeImagesJournal() {
  const journalImagesContainer = document.getElementById('journal-images-container');
  const imageArray = journalImagesContainer.querySelectorAll('div');
  const currentImage = imageArray[index];
  const nextImage = imageArray[(index === 4) ? 0 : (index + 1)];

  gsap.to(currentImage, { opacity: 0, ease: 'none', duration: 0.75 });
  gsap.to(nextImage, { opacity: 1, ease: 'none', duration: 0.75 });

  index = (index === 4) ? 0 : (index + 1);
  initialized = true;
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
      {
        opacity: 0,
        translateY: 40
      }, {
      opacity: 1,
      translateY: 0,
      scrollTrigger: {
        trigger: ids[i],
        start: `top ${start}%`, // Change according to your needs
        end: `top ${end}%`, // Change according to your needs
        scrub: true
      }
    });
  }
}

let fadeInterval;

export function onInit() {
  if (!initialized) {
    if (document.documentElement.clientWidth > 768) {
      initScriptDesktop();
    } else {
      initScriptMobile();
    }
  }
}

/**
 * On Destroy callback anytime barba navigates away from the page.
 */
export function onDestroy() {

  // Remove Script
  document.querySelectorAll('script').forEach(script => {
    if (script.src.endsWith('journal.js')) {
      script.parentNode.removeChild(script);
    }
  });

  // Remove StyleSheet
  document.querySelectorAll('link').forEach(styleSheet => {
    if (styleSheet.href.endsWith('journal.scss')) {
      styleSheet.parentNode.removeChild(styleSheet);
    }
  });
  initialized = false;
}

let initialized = false;
onInit();
