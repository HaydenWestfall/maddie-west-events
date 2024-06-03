import Barba from "barba";
import "./styles.scss";
import "./assets/fonts/didot-bold.ttf";
import "./assets/fonts/didot-italic.ttf";
import "./assets/fonts/didot-regular.ttf";
import "./assets/general/favicon-32x32.png";
import "./assets/general/menu_1.webp";
import "./assets/contact/maddie_client.webp";
import "./assets/contact/maddie_phone.webp";
import "./assets/logo/maddie_west_logo.png";

let targetPage = "";
let anchorListeners = [];
const loadingScreen = document.getElementById("route-page");
const transitionText = loadingScreen.children[0];

initHeader();
selectAnchors();

document.addEventListener("DOMContentLoaded", () => {
  Barba.init({
    transitions: [
      {
        async leave(data) {
          window.barbaIsActive = true;
          await pageTransitionIn();
          data.current.container.remove();
        },

        async beforeEnter(data) {
          const newRouteName = data.next.namespace;
          const head = document.getElementsByTagName("head")[0];
          let scriptLoaded = false;

          for (var i = 0; i < head.children.length; i++) {
            const scriptElement = head.children[i];
            if (
              scriptElement.src &&
              scriptElement.src.endsWith(newRouteName + ".js")
            ) {
              scriptLoaded = true;
            }
          }

          if (!scriptLoaded) {
            const script = document.createElement("script");
            script.type = "module";
            script.src = data.next.namespace + ".js";
            head.appendChild(script);
          }
        },

        async enter(data) {
          document.getElementsByTagName("main")[0].style.overflow = "hidden";
          window.scrollTo(0, 0);
          selectAnchors();
          await pageTransitionOut(data.next.container);
          document.getElementsByTagName("main")[0].style.overflow = "unset";
          window.barbaIsActive = false;
        },

        async once(data) {
          await contentAnimation(data.next.container);
        },
      },
    ],
  });
});

/**
 * Animates in the route transition slide
 *
 * @returns an asynchronous gsap transition
 */
function pageTransitionIn() {
  document.getElementById("route-page").children[0].innerHTML = targetPage;
  return gsap
    .timeline()
    .add("start")
    .to(loadingScreen, {
      duration: 0.7,
      height: "100%",
      top: "unset",
      bottom: 0,
      ease: "power3.in",
    })
    .fromTo(
      transitionText,
      { paddingTop: "40px", opacity: 0 },
      { paddingTop: 0, opacity: 1, duration: 0.4 }
    );
}

/**
 * Animates out the route transition slide
 *
 * @returns an asynchronous gsap transition
 */
function pageTransitionOut() {
  return gsap
    .timeline({ delay: 0.5 })
    .add("start")
    .to(
      loadingScreen,
      { duration: 0.7, bottom: "unset", top: 0, height: 0, ease: "power3.in" },
      "start"
    )
    .fromTo(
      transitionText,
      { opacity: 1, paddingTop: "0" },
      { opacity: 0, duration: 0.5 },
      "start"
    );
}

/**
 * Attaches an event listener to all anchor tags on the page to properly load the barba transitions
 */
function selectAnchors() {
  anchorListeners.forEach((elem) =>
    document.removeEventListener(elem.event, elem.element, true)
  );
  anchorListeners = [];

  document.querySelectorAll("a").forEach((anchor) => {
    anchor.addEventListener(
      "click",
      function () {
        let tagName = anchor.getAttribute("tag");
        tagName = tagName === "index" ? "MADDDIE WEST EVENTS" : tagName;
        targetPage = tagName.toUpperCase();
      },
      true
    );
    anchorListeners.push({ event: "click", element: anchor });
  });
}

/**
 * Initialize the header component
 */
function initHeader() {
  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY || this.document.documentElement.scrollTop;
    let viewportHeight = window.innerHeight;
    let bottomOfHeader = viewportHeight + viewportHeight * 0.2 - 65;
    const header = this.document.querySelector("header").children[0];
    const callToAction = document.querySelector('[tag="contact"]');
    const headerId = header.getAttribute("id");

    if (header.getAttribute("tag").includes("transparent")) {
      if (scrollTop > bottomOfHeader) {
        header.classList.add("light");
        header.classList.remove("dark");
        header.classList.remove("transparent");
        callToAction.classList.remove("dark");
        callToAction.classList.add("light");
      } else {
        header.classList.remove("light");
        header.classList.remove("dark");
        header.classList.add("transparent");
        callToAction.classList.remove("light");
        callToAction.classList.add("dark");
      }
    }
  });

  const menu = document.getElementById("mobile-menu-wrapper");
  const menuButton = document.getElementById("nav-icon");
  const anchors = document.getElementById("mobile-menu").querySelectorAll("a");

  menuButton.addEventListener("click", function () {
    const currentState = menuButton.getAttribute("data-state");

    if (!currentState || currentState === "closed") {
      menuButton.setAttribute("data-state", "opened");
      menuButton.setAttribute("aria-expanded", "true");
      menu.style.display = "flex";

      setTimeout(() => {
        menu.style.top = "0";
        menu.style.opacity = "1";
      }, 10);
    } else {
      closeMenu();
    }
  });

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", function () {
      setTimeout(() => {
        closeMenu();
      }, 700);
    });
  });

  function closeMenu() {
    menuButton.setAttribute("data-state", "closed");
    menuButton.setAttribute("aria-expanded", "false");
    // body.style.overflow = 'auto';
    menu.style.top = "-10vh";
    menu.style.opacity = "0";

    setTimeout(() => {
      menu.style.display = "none";
    }, 500);
  }
}
