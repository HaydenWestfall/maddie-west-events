const headerStyles = document.createElement("link");
headerStyles.setAttribute("rel", "stylesheet");
headerStyles.setAttribute("href", "header/header.scss");
const gloablStyles = document.createElement("link");
gloablStyles.setAttribute("rel", "stylesheet");
gloablStyles.setAttribute("href", "shared-styles.scss");

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });

    fetch('header/header.html')
      .then(response => response.text())
      .then(html => {
        this.shadowRoot.innerHTML = html;
        this.shadowRoot.appendChild(headerStyles);
        this.shadowRoot.appendChild(gloablStyles);
      });
  }
}

customElements.define("maddie-west-header", Header);
