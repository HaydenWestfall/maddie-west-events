

gsap.registerPlugin(ScrollTrigger);

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
    translateY: -500,
    scrollTrigger: {
        trigger: "#image-3",
        start: "top bottom", // Change according to your needs
        end: "bottom top", // Change according to your needs
        scrub: true
    }
});

gsap.to("#asthetic-image-1", {
    opacity: 1,
    translateY: -20,
    scrollTrigger: {
        trigger: "#asthetic-image-1",
        start: "top 80%", // Change according to your needs
        end: "top center", // Change according to your needs
        scrub: true
    }
});


gsap.to("#asthetic-image-2", {
    opacity: 1,
    translateY: -20,
    scrollTrigger: {
        trigger: "#asthetic-image-2",
        start: "top 80%", // Change according to your needs
        end: "top center", // Change according to your needs
        scrub: true
    }
});


gsap.to("#asthetic-image-3", {
    opacity: 1,
    translateY: -20,
    scrollTrigger: {
        trigger: "#asthetic-image-3",
        start: "top 80%", // Change according to your needs
        end: "top center", // Change according to your needs
        scrub: true
    }
});


gsap.to("#asthetic-image-4", {
    opacity: 1,
    translateY: -20,
    scrollTrigger: {
        trigger: "#asthetic-image-4",
        start: "top 80%", // Change according to your needs
        end: "top center", // Change according to your needs
        scrub: true
    }
});


gsap.to("#currently-booking", {
    translateX: -500,
    scrollTrigger: {
        trigger: "#currently-booking",
        start: "top bottom", // Change according to your needs
        end: "bottom top", // Change according to your needs
        scrub: true
    }
});

/////////////////////////////////////////////////////////////////////////////
//  SCROLLBAR TOGGLE VISIBILITY ON SCROLL
/////////////////////////////////////////////////////////////////////////////
// let lastScrollTop = 0;
// const navbar = document.getElementsByTagName('maddie-west-header')[0];
// const shadowElement = navbar.shadowRoot;
// window.addEventListener('scroll', function () {
//     let scrollTop = window.scrollY || this.document.documentElement.scrollTop;
//     if (scrollTop > lastScrollTop) {
//         shadowElement.querySelector('header').style.top = '-50px';
//     } else {
//         shadowElement.querySelector('header').style.top = '0';
//     }
//     lastScrollTop = scrollTop;
// });

/////////////////////////////////////////////////////////////////////////////
//  Journal Section
/////////////////////////////////////////////////////////////////////////////

export function rotate(direction) {
    const nextIndex = (direction == 'next') ? 3 : 1;
    const carouselWrapper = document.getElementById('journal-carousel');
    const nextItem = carouselWrapper.children[nextIndex];
    nextItem.scrollIntoView({ behavior: "instant", block: "nearest", inline: "center" });
    setTimeout(() => {
        const child = carouselWrapper.children[0];
        carouselWrapper.removeChild(child);
        carouselWrapper.appendChild(child);
    }, 500);
}




const cardWrapper = document.querySelector('.journal-carousel');
const cardWrapperChildren = Array.from(cardWrapper.children)
const widthToScroll = (cardWrapper.children[0]).offsetWidth;
const arrowPrev = document.querySelector('.arrow.prev')
const arrowNext = document.querySelector('.arrow.next')
const cardBounding = cardWrapper.getBoundingClientRect()
const column = Math.floor(cardWrapper.offsetWidth / (widthToScroll + 24));

const cardWidth = (cardWrapper.children[0]).offsetWidth;

// cardWrapper.style.left = '-264px';


let myIndex = 1;
export function test() {
    if (myIndex === 11) {
        myIndex = 1;
        cardWrapper.classList.remove('test-scroll');
        cardWrapper.style.left = '0';
        const childToShrink = cardWrapper.children[11];
        childToShrink.classList.remove('grow');

        const childToGrow = cardWrapper.children[1];
        childToGrow.classList.remove('animate-grow');
        childToGrow.classList.add('grow');
    }

    setTimeout(() => {
        cardWrapper.classList.add('test-scroll');
        cardWrapper.children[1].classList.add('animate-grow');
        const childToShrink = cardWrapper.children[myIndex];
        childToShrink.classList.remove('grow');

        myIndex++;

        const targetElemOffsetLeft = (cardWrapper.children[myIndex]).offsetLeft;
        const targetElemWidth = (cardWrapper.children[myIndex]).offsetWidth;
        const middle = document.documentElement.clientWidth / 2;
        const leftPos = middle - targetElemOffsetLeft;
        cardWrapper.style.left = 'calc(' + leftPos + 'px - ' + (targetElemWidth / 2) + 'px)';
        // cardWrapper.style.left = leftPos + 'px';

        const childToGrow = cardWrapper.children[myIndex];
        childToGrow.classList.add('grow');
    }, 500);
}

export function test2() {

    let offsetLeftString = cardWrapper.style.left;
    offsetLeftString = offsetLeftString.substring(0, offsetLeftString.length - 2)
    const cardWrapperOffsetLeft = (!isNaN(offsetLeftString) && offsetLeftString != '') ? Number.parseInt(offsetLeftString) : 0;

    const imageWidth = (cardWrapper.children[0]).offsetWidth;
    const middleOfViewPort = document.documentElement.clientWidth / 2;
    const leftPos = middleOfViewPort - cardWrapperOffsetLeft;
    const target = leftPos - (imageWidth / 2);
    const test3 = document.documentElement.clientWidth * .08;
    let newIndex = Math.ceil(target / Math.ceil(imageWidth + test3));

    console.log(newIndex);

    if (newIndex === 11) {
        newIndex = 1;
        cardWrapper.style.left = '0';
        const childToShrink = cardWrapper.children[11];
        childToShrink.style.transform = 'scale(1) !important';

        const childToGrow = cardWrapper.children[1];
        childToGrow.style.transform = 'scale(1.25) !important';
        return;
    }

    const childToShrink = cardWrapper.children[newIndex];
    const childToShrinkId = childToShrink.getAttribute('id');

    console.log("#" + childToShrinkId)
    gsap.to("#" + childToShrinkId, { scale: 1, duration: 0.75, ease: 'power1.out' });

    newIndex++;

    console.log(target * -1)
    gsap.to("#card-wrapper", { left: (target * -1) + 'px', duration: 0.75, ease: 'none' });

    // cardWrapper.style.left = leftPos + 'px';

    const childToGrow = cardWrapper.children[newIndex];
    const childToGrowId = childToGrow.getAttribute('id');
    gsap.to("#" + childToGrowId, { scale: 1.25, duration: 0.75, ease: 'power1.in' });


    setTimeout(() => {
        test2();
    }, 2000);
}

export function test3() {

    var container2 = document.getElementById('card-wrapper');
    var current = container2.querySelectorAll('[current="' + true + '"]');
    var next = container2.querySelectorAll('[next="' + true + '"]');
    var curIndex = Number.parseInt(next[0].getAttribute('index'));

    let offScreenLeft = container2.querySelectorAll('[index="' + (curIndex - 2) + '"]');
    let newOnScreenRight = container2.querySelectorAll('[index="' + (curIndex + 1) + '"]');

    console.log(curIndex)

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

        test3();
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
    }, 750);
}

export function test3Small() {
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


if (document.documentElement.clientWidth > 768) {
    var first = document.getElementById('card-wrapper').querySelectorAll('[index="' + 1 + '"]');
    var second = document.getElementById('card-wrapper').querySelectorAll('[index="' + 2 + '"]');
    var third = document.getElementById('card-wrapper').querySelectorAll('[index="' + 3 + '"]');
    first[0].style.opacity = 1;
    second[0].style.opacity = 1;
    third[0].style.opacity = 1;
    gsap.to(second[0], { scale: 1.25, duration: 0, ease: 'none' });
}

// document.getElementById('test').addEventListener('click', function () {
//     test3();
// })

const intervalId = setInterval(() => {
    if (document.documentElement.clientWidth > 768) {
        test3();
    } else {
        test3Small();
    }
}, 3000);



/////////////////////////////////////////////////////////////////////////////
//  Comments Section
/////////////////////////////////////////////////////////////////////////////

let testimonyIndex = 2;
const comments = [
    { couple: "The Jones Wedding", date: "MAY 24, 2023", testimony: "Maddie literally saved the day for our wedding! This girl did everything and more for us! We hired Maddie as our day of coordinator only a couple months before our day, after we realized how insane planning a wedding was! She allowed me to feel relaxed knowing she was running the show! She was able to be firm but sweet! I cannot recommend her enough! She allowed me to feel relaxed knowing she was running the show! She was able to be firm but sweet! I cannot recommend her enough!" },
    { couple: "The Westfall Wedding", date: "JUNE 12, 2023", testimony: "Maddie literally saved the day for our wedding! This girl did everything and more for us! We hired Maddie as our day of coordinator only a couple months before our day, after we realized how insane planning a wedding was! She allowed me to feel relaxed knowing she was running the show! She was able to be firm but sweet! I cannot recommend her enough! She allowed me to feel relaxed knowing she was running the show! She was able to be firm but sweet! I cannot recommend her enough!" },
    { couple: "The Buhrman Wedding", date: "JULY 16, 2023", testimony: "Maddie literally saved the day for our wedding! This girl did everything and more for us! We hired Maddie as our day of coordinator only a couple months before our day, after we realized how insane planning a wedding was! She allowed me to feel relaxed knowing she was running the show! She was able to be firm but sweet! I cannot recommend her enough! She allowed me to feel relaxed knowing she was running the show! She was able to be firm but sweet! I cannot recommend her enough!" },
    { couple: "The Hildebrand Wedding", date: "AUGUST 22, 2023", testimony: "Maddie literally saved the day for our wedding! This girl did everything and more for us! We hired Maddie as our day of coordinator only a couple months before our day, after we realized how insane planning a wedding was! She allowed me to feel relaxed knowing she was running the show! She was able to be firm but sweet! I cannot recommend her enough! She allowed me to feel relaxed knowing she was running the show! She was able to be firm but sweet! I cannot recommend her enough!" }
];

export function rotateReview() {
    const container1 = document.getElementById('1');
    const container2 = document.getElementById('2');
    let topContainer;
    let bottomContainer;
    if (container1?.style.top !== '100%') {
        topContainer = container1;
        bottomContainer = container2;
    } else {
        topContainer = container2;
        bottomContainer = container1;
    }
    topContainer.style.top = '-100%';
    bottomContainer.style.top = '0';

    document.getElementById('current-index').textContent = `0${testimonyIndex.toString()}.`;
    document.getElementById('next-index').textContent = `0${(testimonyIndex + 1).toString()}.`;

    setTimeout(() => {
        topContainer.classList.remove('animate-scroll');
        topContainer.style.top = '100%';
        topContainer.querySelector('#wedding-name').textContent = comments[testimonyIndex].couple;
        topContainer.querySelector('#wedding-date').textContent = comments[testimonyIndex].date;
        topContainer.querySelector('#wedding-description').textContent = comments[testimonyIndex].testimony;

        setTimeout(() => {
            topContainer.classList.add('animate-scroll');
            testimonyIndex = (testimonyIndex === comments.length - 1) ? 0 : testimonyIndex + 1;
        }, 50);
    }, 1000);
}

// test2();


// Call the function every 2 seconds (2000 milliseconds)
// const intervalId = setInterval(() => { test2() }, 3000);

// setTimeout(() => {
//     test()
// }, 100);
// setTimeout(() => {
//     console.log((cardWrapper.children[3] as HTMLElement).offsetWidth);
//     console.log((cardWrapper.children[3] as HTMLElement).offsetLeft);
//     console.log(document.documentElement.clientWidth);
//     test()

//     setTimeout(() => {
//         // cardWrapper.style.left = '-588.5px'
//     }, 2000);
// }, 2500);

