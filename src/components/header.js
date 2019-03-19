export default class Header extends HTMLElement {
    constructor() {
        super();
    }

    get header() {
        return this.getAttribute('header');
    }

    set header(header) {
        this.setAttribute('header', header);
    }

    static get observedAttributes() {
        return ['header'];
    }

    attributeChangedCallback(attibute, oldVal, newVal) {
        var h3 = this.querySelector('h3');
        switch(attibute) {
            case 'header':
                h3.innerHTML = `${this.header}`;
        }
    }

    connectedCallback() {
        let template = `
            <div class="header-style">
                <a class="navbar-brand col-3 glyphicon glyphicon-chevron-left" href="#"></a>
                <nav class="navbar navbar-light bg-light col-9">
                    <h3>${this.header}</h3>
                </nav>
            </div>
        `;


        this.innerHTML = template;
    }
}