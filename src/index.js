
/////////////////////////////////////////////////////////////////////////////
//  Journal Section
/////////////////////////////////////////////////////////////////////////////
export function marqueeJournalImages() {
    var container2 = document.getElementById('card-wrapper');
    var current = container2.querySelectorAll('[current="' + true + '"]');
    var next = container2.querySelectorAll('[next="' + true + '"]');
    var curIndex = Number.parseInt(next[0].getAttribute('index'));

    let offScreenLeft = container2.querySelectorAll('[index="' + (curIndex - 2) + '"]');
    let newOnScreenRight = container2.querySelectorAll('[index="' + (curIndex + 1) + '"]');

    if (curIndex == 13) {
        container2.scrollLeft = 0;

        let wrap1 = container2.querySelectorAll('[index="11"]');
        let wrap2 = container2.querySelectorAll('[index="12"]');
        let wrap3 = container2.querySelectorAll('[index="13"]');
        wrap1[0].style.opacity = 0;
        wrap2[0].style.opacity = 0;
        wrap3[0].style.opacity = 0;

        wrap1 = container2.querySelectorAll('[index="1"]');
        wrap2 = container2.querySelectorAll('[index="2"]');
        wrap3 = container2.querySelectorAll('[index="3"]');
        wrap1[0].style.opacity = 1;
        wrap2[0].style.opacity = 1;
        wrap3[0].style.opacity = 1;

        next[0].setAttribute('current', false);
        next[0].setAttribute('next', false);
        current[0].setAttribute('current', false);
        current[0].setAttribute('next', false);
        gsap.to(current[0], { scale: 1, duration: 0, ease: 'none' });

        current = container2.querySelectorAll('[index="' + 2 + '"]');
        next = container2.querySelectorAll('[index="' + 3 + '"]');

        gsap.to(current[0], { scale: 1.25, duration: 0, ease: 'none' });

        next[0].setAttribute('current', false);
        next[0].setAttribute('next', true);
        current[0].setAttribute('current', true);
        current[0].setAttribute('next', false);

        marqueeJournalImages();
        return;
    }

    var elementRect = next[0].getBoundingClientRect();
    var scrollAmount = container2.scrollLeft + elementRect.width + 92.64;
    var windowWidth = document.documentElement.clientWidth;
    var middleWidth = windowWidth / 2;
    var leftElem = elementRect.left + (elementRect.width / 2);
    scrollAmount = container2.scrollLeft - (middleWidth - leftElem);

    // Animate the scroll using GSAP
    gsap.to(container2, { scrollLeft: scrollAmount, duration: 0.75, ease: "none" });
    gsap.to(current[0], { scale: 1, duration: 0.75, ease: 'none' });
    gsap.to(next[0], { scale: 1.25, duration: 0.75, ease: 'none' });
    gsap.to(offScreenLeft[0], { opacity: 0, duration: 0.75, ease: 'none' });
    gsap.to(newOnScreenRight[0], { opacity: 1, duration: 0.75, ease: 'none' });

    setTimeout(() => {
        const newNext = container2.querySelectorAll('[index="' + (curIndex + 1) + '"]');

        current[0].setAttribute('current', false);
        next[0].setAttribute('current', true);
        next[0].setAttribute('next', false);
        newNext[0].setAttribute('next', true);
    }, 50);
}

export function fadeImages() {
    var container = document.getElementById('card-wrapper');
    var currentImage = container.querySelectorAll('[current="' + true + '"]');
    var nextImage = container.querySelectorAll('[next="' + true + '"]');

    gsap.to(currentImage[0], { opacity: 0, ease: 'none', duration: 0.75 });
    gsap.to(nextImage[0], { opacity: 1, ease: 'none', duration: 0.75 });

    setTimeout(() => {
        const newNextIndex = Number.parseInt(nextImage[0].getAttribute('index')) + 1;
        const newNext = (newNextIndex < 11)
            ? container.querySelectorAll('[index="' + newNextIndex + '"]')
            : container.querySelectorAll('[index="1"]');
        currentImage[0].setAttribute('current', false);
        nextImage[0].setAttribute('current', true);
        nextImage[0].setAttribute('next', false);
        newNext[0].setAttribute('next', true);
    }, 750);
}


/**
 * On script load init the file
 */
export function initScript() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo("#about-maddie-subheader", {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
            trigger: "#about-maddie-subheader",
            start: "top 70%", // Change according to your needs
            end: "top 50%", // Change according to your needs
            scrub: true
        }
    });

    gsap.fromTo("#about-maddie-header", {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
            trigger: "#about-maddie-header",
            start: "top 70%", // Change according to your needs
            end: "top 50%", // Change according to your needs
            scrub: true
        }
    });

    gsap.fromTo("#about-maddie-description", {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
            trigger: "#about-maddie-description",
            start: "top 70%", // Change according to your needs
            end: "top 50%", // Change according to your needs
            scrub: true
        }
    });

    gsap.fromTo("#journal-subheader", {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
            trigger: "#journal-subheader",
            start: "top 70%", // Change according to your needs
            end: "top 50%", // Change according to your needs
            scrub: true
        }
    });

    gsap.fromTo("#journal-header", {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
            trigger: "#journal-header",
            start: "top 70%", // Change according to your needs
            end: "top 50%", // Change according to your needs
            scrub: true
        }
    });

    gsap.fromTo("#journal-description", {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
            trigger: "#journal-description",
            start: "top 70%", // Change according to your needs
            end: "top 50%", // Change according to your needs
            scrub: true
        }
    });

    gsap.to("#image-1", {
        translateY: -1200,
        scrollTrigger: {
            trigger: "#image-1",
            start: "top bottom", // Change according to your needs
            end: "bottom top", // Change according to your needs
            scrub: true
        }
    });

    gsap.to("#image-2", {
        translateY: -200,
        scrollTrigger: {
            trigger: "#image-2",
            start: "top bottom", // Change according to your needs
            end: "bottom top", // Change according to your needs
            scrub: true
        }
    });

    gsap.to("#image-3", {
        translateY: -1500,
        scrollTrigger: {
            trigger: "#image-3",
            start: "top bottom", // Change according to your needs
            end: "bottom top", // Change according to your needs
            scrub: true
        }
    });

    gsap.fromTo("#asthetic-image-1", {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
            trigger: "#asthetic-image-1",
            start: "top 80%", // Change according to your needs
            end: "top center", // Change according to your needs
            scrub: true
        }
    });


    gsap.fromTo("#asthetic-image-2", {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
            trigger: "#asthetic-image-2",
            start: "top 80%", // Change according to your needs
            end: "top center", // Change according to your needs
            scrub: true
        }
    });


    gsap.fromTo("#asthetic-image-3", {
        y: 50,
        opacity: 0
    }, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
            trigger: "#asthetic-image-3",
            start: "top 80%", // Change according to your needs
            end: "top center", // Change according to your needs
            scrub: true
        }
    });

    gsap.fromTo("#asthetic-image-4", {
        y: 50,
        opacity: 0
    }, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
            trigger: "#asthetic-image-4",
            start: "top 80%", // Change according to your needs
            end: "top center", // Change according to your needs
            scrub: true
        }
    });

    gsap.fromTo("#asthetic-subheader", {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
            trigger: "#asthetic-subheader",
            start: "top 70%", // Change according to your needs
            end: "top 50%", // Change according to your needs
            scrub: true
        }
    });

    gsap.fromTo("#asthetic-header", {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
            trigger: "#asthetic-header",
            start: "top 70%", // Change according to your needs
            end: "top 50%", // Change according to your needs
            scrub: true
        }
    });

    gsap.fromTo("#asthetic-description", {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
            trigger: "#asthetic-description",
            start: "top 70%", // Change according to your needs
            end: "top 50%", // Change according to your needs
            scrub: true
        }
    });

    // gsap.fromTo("#maddie-flowers-video", {
    //     y: -250
    // }, {
    //     y: 0,
    //     scrollTrigger: {
    //         trigger: "#maddie-flowers-video",
    //         start: "top bottom", // Change according to your needs
    //         end: "bottom top", // Change according to your needs
    //         scrub: true,
    //         markers: true
    //     }
    // });

    gsap.fromTo("#maddie-flowers-header", {
        opacity: 0
    }, {
        opacity: 1,
        scrollTrigger: {
            trigger: "#maddie-flowers-header",
            start: "top 85%", // Change according to your needs
            end: "top 50%", // Change according to your needs
            scrub: true
        }
    });

    if (document.documentElement.clientWidth > 768) {
        const first = document.getElementById('card-wrapper').querySelectorAll('[index="' + 1 + '"]')[0];
        const second = document.getElementById('card-wrapper').querySelectorAll('[index="' + 2 + '"]')[0];
        const third = document.getElementById('card-wrapper').querySelectorAll('[index="' + 3 + '"]')[0];
        first.style.opacity = 1;
        second.style.opacity = 1;
        third.style.opacity = 1;
        gsap.to(second, { scale: 1.25, duration: 0, ease: 'none' });
    }

    marqueeInterval = setInterval(() => {
        if (document.documentElement.clientWidth > 768) {
            marqueeJournalImages();
        } else {
            fadeImages();
        }
    }, 1750);
    initialized = true;
}

/**
 * Calls the initScript function only one time. If the file is loading
 * for the first time onInit will run by default and we do not need
 * the barba.js callback. So ignore the second call if initizlized
 * is true
 */
export function onInit() {
    if (!initialized) {
        initScript();
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
