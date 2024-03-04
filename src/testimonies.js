

gsap.registerPlugin(ScrollTrigger);

function setAniamtion() {
  const ids = [
    '#testimony-1-quote',
    '#testimony-1-image-1',
    '#testimony-1-image-2',
    '#testimony-2-quote',
    '#testimony-2-image-1',
    '#testimony-2-image-2',
    '#testimony-3-quote',
    '#testimony-3-image-1',
    '#testimony-3-image-2',

  ];

  for (const id of ids) {
    gsap.to(id, {
      opacity: 1,
      scrollTrigger: {
        trigger: id,
        start: "top bottom", // Change according to your needs
        end: "top 25%", // Change according to your needs
        scrub: true
      }
    });
  }
}

setAniamtion();

