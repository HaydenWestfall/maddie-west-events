

/**
 * Initilize this script
 */
function initScript() {
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
  journalTimeline.delay(0.4);
  journalTimeline.play();

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

  setJournalAnimations();
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
