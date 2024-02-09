
const contactStyles = document.createElement("link");
contactStyles.setAttribute("rel", "stylesheet");
contactStyles.setAttribute("href", "contact/contact.scss");

const contactSharedStyles = document.createElement("link");
contactSharedStyles.setAttribute("rel", "stylesheet");
contactSharedStyles.setAttribute("href", "shared-styles.scss");

class Contact extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" });

        fetch('contact/contact.html')
            .then(response => response.text())
            .then(html => {
                this.shadowRoot.innerHTML = html;

                this.shadowRoot.appendChild(contactStyles);
                this.shadowRoot.appendChild(contactSharedStyles);
            });
    }
}

customElements.define("maddie-west-contact", Contact);
