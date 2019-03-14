export default class GroupCard extends HTMLElement {
    constructor() {
        super();
    }

    get imageURL() {
        return this.getAttribute('imageURL');
    }

    get urlName() {
        return this.getAttribute('urlName');
    }

    set imageURL(imageUrl) {
        this.setAttribute('imageURL', imageUrl);
    }

    set urlName(urlName) {
        this.setAttribute('urlName', urlName);
    }

    static get observedAttributes() {
        return ['imageURL', 'urlName'];
    }

    attributeChangedCallback(attibute, oldVal, newVal) {
        var groupCard = this.querySelector('.group-card');

        switch(attibute) {
            case 'imageURL':
                this.imageURL = newVal;
                groupCard.innerHTML = `${this.imageURL}`;
            break;
            case 'urlName':
                this.urlName = newVal;
                groupCard.innerHTML = `${this.urlName}`;
        }
    }

    connectedCallback() {
        let template = `
            <a href="./details.html?${this.urlName}" class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="${this.imageURL}" alt="">
            </a>
        `;


        this.innerHTML = template;
    }
}