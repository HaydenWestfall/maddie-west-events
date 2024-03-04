
/////////////////////////////////////////////////////////////////////////////
//  SCROLLBAR TOGGLE VISIBILITY ON SCROLL
/////////////////////////////////////////////////////////////////////////////


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


function switchImage() {
  const image = document.getElementById('about-cover-photo');
  if (document.documentElement.clientWidth > 768) {
    image.src = "/ assets/about/cover.png";
  } else {
    image.src = "/ assets/about/cover_2.png";
  }
}

switchImage();
window.addEventListener('resize', switchImage);

