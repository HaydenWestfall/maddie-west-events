class Header extends HTMLElement {
    constructor() {
      super();
    }

  connectedCallback() {
    this.innerHTML = `
      <style>
        nav {
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color:  white;
          padding: 0 2rem
        }

        #maddie-text {
            font-family: Montserrat;
            font-style: regular
            font-size: 2rem;
            letter-spacing: 2px;
            color: black;
        }

        nav-options {
            display: flex;
            gap: 2rem;
        }

        
      </style>
      <header>
        <nav>
          <span id="maddie-text">Maddie West Events</span>
          <div class="nav-options">
            <a href="index.html">About</a>
            <a href="page1.html">Testimonies</a>
            <a href="page2.html">Jounral</a>
          </div>
        </nav>
      </header>
    `;
  }
}
  
customElements.define('maddie-west-header', Header);
  