/**
 * Calls the initScript function only one time. If the file is loading
 * for the first time onInit will run by default and we do not need
 * the barba.js callback. So ignore the second call if initizlized
 * is true
 */
export function onInit() {
    if (!initialized) {
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
        let windowWidth = window.innerWidth;
        const videos = Array.from(document.getElementsByTagName('video'));
        videos.forEach(video => video.play());

        initJournalSection();

        window.addEventListener('resize', () => {
            if (window.innerWidth != windowWidth) {
                console.log('RESIZE GHAPPEBNED')
                windowWidth = window.innerWidth;
                initJournalSection()
            }
        });

        initialized = true;
    }
}

/**
 * GSAP animation for animating in elements
 * @param {*} id 
 * @param {*} scrub 
 */
export function animateElementIn(id, scrub) {
    gsap.fromTo(id,
        {
            opacity: 0,
            y: 30
        },
        {
            y: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: id,
                start: "top 70%",
                end: "top 50%",
                scrub: scrub
            }
        });
}

/**
 * Determine if journal section should fade images or marquee images
 */
let index = 0;
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
 * Changes journal section to fade images instead of marquee
 */
export function fadeImages() {
    let images = Array.from(document.getElementById('journal-carousel').children);
    images.splice(-3);
    const fromIndex = (index != 0) ? (index - 1) : (images.length - 1);

    if (initialized) {
        gsap.to(images[fromIndex], { opacity: 0, duration: 2 });
    }
    gsap.to(images[index], { opacity: 1, duration: 2 });

    if (index == images.length - 1) {
        index = 0;
    } else {
        index = index + 1;
    }
}

/**
 * On Destroy callback anytime barba navigates away from the page.
 */
export function onDestroy() {
    // Stop the interval
    clearInterval(marqueeInterval);

    // Remove Script
    document.querySelectorAll('script').forEach(script => {
        if (script.src.endsWith('index.js')) {
            script.parentNode.removeChild(script);
        }
    });

    // Remove StyleSheet
    document.querySelectorAll('link').forEach(styleSheet => {
        if (styleSheet.href.endsWith('index.scss')) {
            styleSheet.parentNode.removeChild(styleSheet);
        }
    });
    initialized = false;
}

let initialized = false;
let marqueeInterval;
onInit();
