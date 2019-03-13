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
        var navbar = this.querySelector('.navbar');

        switch(attibute) {
            case 'meetup':
                navbar.innerHTML = `${this.header}`;
        }
    }

    connectedCallback() {
        let template = `
            <nav class="navbar fixed-top navbar-light bg-light">
                <a class="navbar-brand" href="#">
                    <img src="../public/Images/iconfinder_social_media_network-24_1851682.png" width="30" height="30" alt="">
                </a>
                <h3>${this.header}</h3>
            </nav>
        `;


        this.innerHTML = template;
    }
}