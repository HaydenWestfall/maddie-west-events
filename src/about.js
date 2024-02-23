
/////////////////////////////////////////////////////////////////////////////
//  SCROLLBAR TOGGLE VISIBILITY ON SCROLL
/////////////////////////////////////////////////////////////////////////////
let lastScrollTop = 0;
const navbar = document.getElementsByTagName('maddie-west-header')[0];
const shadowElement = navbar.shadowRoot;
window.addEventListener('scroll', function () {
  let scrollTop = window.scrollY || this.document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    shadowElement.querySelector('header').style.top = '-50px';
  } else {
    shadowElement.querySelector('header').style.top = '0';
  }
  lastScrollTop = scrollTop;
});

gsap.registerPlugin(ScrollTrigger);

gsap.to("#client-quote", {
  translateY: -100,
  scrollTrigger: {
    trigger: "#client-quote",
    start: "top bottom", // Change according to your needs
    end: "top 80%", // Change according to your needs
    scrub: true
  }
});

gsap.to("#about-maddie-image", {
  translateY: -100,
  scrollTrigger: {
    trigger: "#about-maddie-image",
    start: "top bottom", // Change according to your needs
    end: "top 80%", // Change according to your needs
    scrub: true
  }
});

gsap.to("#about-text-block-1", {
  translateY: -100,
  opacity: 1,
  scrollTrigger: {
    trigger: "#about-text-block-1",
    start: "top 80%", // Change according to your needs
    end: "top center", // Change according to your needs
    scrub: true
  }
});

gsap.to("#about-text-block-1", {
  translateY: -100,
  opacity: 1,
  scrollTrigger: {
    trigger: "#about-text-block-1",
    start: "top 80%", // Change according to your needs
    end: "top center", // Change according to your needs
    scrub: true
  }
});

gsap.to("#about-text-block-2", {
  translateY: -100,
  opacity: 1,
  scrollTrigger: {
    trigger: "#about-text-block-2",
    start: "top 80%", // Change according to your needs
    end: "top center", // Change according to your needs
    scrub: true
  }
});


gsap.to("#more-section-image", {
  translateY: -100,
  opacity: 1,
  scrollTrigger: {
    trigger: "#more-section-image",
    start: "top bottom", // Change according to your needs
    end: "top 90%", // Change according to your needs
    scrub: true
  }
});

gsap.to("#more-section-sub-header", {
  translateY: -100,
  opacity: 1,
  scrollTrigger: {
    trigger: "#more-section-sub-header",
    start: "top 80%", // Change according to your needs
    end: "top 60%", // Change according to your needs
    scrub: true
  }
});


gsap.to("#more-section-header", {
  translateY: -100,
  opacity: 1,
  scrollTrigger: {
    trigger: "#more-section-header",
    start: "top 80%", // Change according to your needs
    end: "top center", // Change according to your needs
    scrub: true
  }
});


gsap.to("#more-section-description", {
  translateY: -100,
  opacity: 1,
  scrollTrigger: {
    trigger: "#more-section-description",
    start: "top 80%", // Change according to your needs
    end: "top center", // Change according to your needs
    scrub: true
  }
});

