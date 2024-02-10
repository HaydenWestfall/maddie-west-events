"use strict";
const headerStyles = document.createElement("link");
headerStyles.setAttribute("rel", "stylesheet");
headerStyles.setAttribute("href", "header/header.scss");
const headerSharedStyles = document.createElement("link");
headerSharedStyles.setAttribute("rel", "stylesheet");
headerSharedStyles.setAttribute("href", "shared-styles.scss");
class Header extends HTMLElement {
    constructor() {
        super();
        this.theme = 'light'; // Default mode is light
    }
    connectedCallback() {
        this.attachShadow({ mode: "open" });
        console.log(this.getAttribute('theme'));
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
        });
    }
    setTheme() {
        this.shadowRoot.getElementById('maddie-west-header').classList.add(this.theme);
        this.shadowRoot.getElementById('call-to-action').classList.add(this.theme);
    }
}
customElements.define("maddie-west-header", Header);
