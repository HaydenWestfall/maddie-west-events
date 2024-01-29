
const footerStyles = document.createElement("link");
footerStyles.setAttribute("rel", "stylesheet");
footerStyles.setAttribute("href", "footer/footer.scss");

const sharedStyles = document.createElement("link");
sharedStyles.setAttribute("rel", "stylesheet");
sharedStyles.setAttribute("href", "shared-styles.scss");

class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" });

        fetch('footer/footer.html')
            .then(response => response.text())
            .then(html => {
                this.shadowRoot.innerHTML = html;

                this.shadowRoot.appendChild(footerStyles);
                this.shadowRoot.appendChild(sharedStyles);
            });
    }
}

customElements.define("maddie-west-footer", Footer);
