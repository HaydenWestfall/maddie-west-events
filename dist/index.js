var _a, _b, _c;
const images = document.querySelectorAll('div.carousel-image');
console.log(images);
let index = 0;
(_a = document.getElementById('left')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    rotate('prev');
});
(_b = document.getElementById('right')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    rotate('next');
});
(_c = document.getElementById('test')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
    test();
});
/////////////////////////////////////////////////////////////////////////////
//  SCROLLBAR TOGGLE VISIBILITY ON SCROLL
/////////////////////////////////////////////////////////////////////////////
let lastScrollTop = 0;
const navbar = document.getElementsByTagName('maddie-west-header')[0];
const shadowElement = navbar.shadowRoot;
window.addEventListener('scroll', function () {
    let scrollTop = window.scrollY || this.document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        shadowElement.querySelector('header').style.top = '-80px';
    }
    else {
        shadowElement.querySelector('header').style.top = '0';
    }
    lastScrollTop = scrollTop - 20;
});
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
const cardWrapperChildren = Array.from(cardWrapper.children);
const widthToScroll = cardWrapper.children[0].offsetWidth;
const arrowPrev = document.querySelector('.arrow.prev');
const arrowNext = document.querySelector('.arrow.next');
const cardBounding = cardWrapper.getBoundingClientRect();
const column = Math.floor(cardWrapper.offsetWidth / (widthToScroll + 24));
const cardWidth = cardWrapper.children[0].offsetWidth;
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
        const targetElemOffsetLeft = cardWrapper.children[myIndex].offsetLeft;
        const targetElemWidth = cardWrapper.children[myIndex].offsetWidth;
        const middle = document.documentElement.clientWidth / 2;
        const leftPos = middle - targetElemOffsetLeft;
        cardWrapper.style.left = 'calc(' + leftPos + 'px - ' + (targetElemWidth / 2) + 'px)';
        // cardWrapper.style.left = leftPos + 'px';
        const childToGrow = cardWrapper.children[myIndex];
        childToGrow.classList.add('grow');
    }, 500);
}
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
    if ((container1 === null || container1 === void 0 ? void 0 : container1.style.top) !== '100%') {
        topContainer = container1;
        bottomContainer = container2;
    }
    else {
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
// Call the function every 2 seconds (2000 milliseconds)
const intervalId = setInterval(() => { test(); }, 2000);
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
