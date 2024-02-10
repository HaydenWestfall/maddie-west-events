
const footerStyles = document.createElement("link");
footerStyles.setAttribute("rel", "stylesheet");
footerStyles.setAttribute("href", "footer/footer.scss");

const footerSharedStyles = document.createElement("link");
footerSharedStyles.setAttribute("rel", "stylesheet");
footerSharedStyles.setAttribute("href", "shared-styles.scss");

class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" });

        fetch('footer/footer.html')
            .then(response => response.text())
            .then(html => {
                this.shadowRoot!.innerHTML = html;
                this.shadowRoot!.appendChild(footerStyles);
                this.shadowRoot!.appendChild(footerSharedStyles);
            });
    }
}

customElements.define("maddie-west-footer", Footer);
