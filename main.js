
import { gsap } from "gsap";

function parallax() {
    applyParallax(document.getElementById("floater1"));
    applyParallax(document.getElementById("floater2"));
    applyParallax(document.getElementById("floater3"));
}

function applyParallax(element) {
    let scrollSpeed = Number.parseFloat(element.getAttribute('data-scroll-speed'))
    let yPos = 0 - window.pageYOffset / scrollSpeed;
    element.style.top = 30 + yPos + "%";
}

window.addEventListener("scroll", function () {
    parallax();
});

function navigateTo(page) {
    window.location.href = page;
}

const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    scrollers.forEach((scroller) => {
        // add data-animated="true" to every `.scroller` on the page
        scroller.setAttribute("data-animated", true);

        // Make an array from the elements within `.scroller-inner`
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        // For each item in the array, clone it
        // add aria-hidden to it
        // add it into the `.scroller-inner`
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}

