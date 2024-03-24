
let lastScrollTop = 0;
window.addEventListener('scroll', function () {
  const scrollTop = window.scrollY || this.document.documentElement.scrollTop;
  const header = this.document.querySelector('header');
  const navbarHeight = header.offsetHeight;
  header.style.top = (scrollTop > lastScrollTop && document.documentElement.clientWidth > 768)
    ? `-${navbarHeight + 1}px`
    : '0';
  lastScrollTop = scrollTop;
});

const body = document.getElementsByTagName('body')[0];
const menu = document.getElementById('mobile-menu-wrapper');
const menuButton = document.getElementById('nav-icon');
const anchors = document.getElementById('mobile-menu').querySelectorAll('a');

menuButton.addEventListener('click', function () {
  const currentState = menuButton.getAttribute("data-state");

  if (!currentState || currentState === "closed") {
    menuButton.setAttribute("data-state", "opened");
    menuButton.setAttribute("aria-expanded", "true");
    // body.style.overflow = 'hidden';
    menu.style.display = 'flex';


    // var themeColorMeta = document.querySelector('meta[name="theme-color"]');
    // themeColorMeta.setAttribute('content', '#1a1a1a');

    setTimeout(() => {
      menu.style.top = '0';
      menu.style.opacity = '1';
    }, 10);
  } else {
    closeMenu();
  }
});

anchors.forEach(anchor => {
  anchor.addEventListener('click', function () {
    setTimeout(() => {
      closeMenu();
    }, 700);
  });
});

function closeMenu() {
  menuButton.setAttribute("data-state", "closed");
  menuButton.setAttribute("aria-expanded", "false");
  // body.style.overflow = 'auto';
  menu.style.top = '-10vh';
  menu.style.opacity = '0';

  setTimeout(() => {
    menu.style.display = 'none';
  }, 500);
}



