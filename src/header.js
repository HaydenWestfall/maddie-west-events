
const headerStyles = document.createElement("link");
headerStyles.setAttribute("rel", "stylesheet");
headerStyles.setAttribute("href", "header/header.scss");
const headerSharedStyles = document.createElement("link");
headerSharedStyles.setAttribute("rel", "stylesheet");
headerSharedStyles.setAttribute("href", "shared-styles.scss");

class Header extends HTMLElement {
  theme = 'light';

  constructor() {
    super();
    this.theme = 'light';
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });

    if (this.getAttribute('theme') === 'dark') {
      this.theme = 'dark';
    }

    fetch('header/header.html')
      .then(response => response.text())
      .then(html => {
        this.shadowRoot.innerHTML = html;
        this.shadowRoot.appendChild(headerStyles);
        this.shadowRoot.appendChild(headerSharedStyles);
        this.setTheme();

        const navIcon = this.shadowRoot.getElementById('nav-icon');
        const closeIcon = this.shadowRoot.getElementById('close-icon');
        const menu = this.shadowRoot.getElementById('mobile-menu-wrapper');

        closeIcon.addEventListener('click', function () {
          menu.style.top = '-20vh';
          menu.style.opacity = '0';


          setTimeout(() => {
            menu.style.display = 'none';
          }, 500);
        });

        navIcon.addEventListener('click', function () {
          menu.style.display = 'flex';

          setTimeout(() => {
            menu.style.top = '0';
            menu.style.opacity = '1';
          }, 10);
        });

        menu.addEventListener('transitionend', function () {
          console.log('here')
        });
      });
  }

  setTheme() {
    this.shadowRoot.getElementById('maddie-west-header').classList.add(this.theme);
    this.shadowRoot.getElementById('call-to-action').classList.add(this.theme);
  }
}

customElements.define("maddie-west-header", Header);
