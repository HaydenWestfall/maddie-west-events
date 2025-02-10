import gsap from "gsap";

export const componentOnLoadAnimationDelay = 0.55;

export enum TransitionState {
  Inactive = "inactive",
  Transitioning = "transitioning",
  DoneTransitioning = "doneTransitioning",
}

export const createGsapAnimation = (
  id: any,
  yPos: number,
  start: string,
  end: string,
  scrub: boolean,
  markers: boolean = false
) => {
  gsap.fromTo(
    id,
    { opacity: 0, y: yPos },
    {
      y: 0,
      opacity: 1,
      scrollTrigger: { trigger: id, start: start, end: end, scrub: scrub, once: false, markers: markers },
    }
  );
};

export const mweNavigate = (event: Event, handleNavigation: Function, path: string) => {
  event.preventDefault();
  handleNavigation(path);
};
