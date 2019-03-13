export default class GroupHighlight extends HTMLElement {
    constructor() {
        super();
    }

    get highlight() {
        return this.getAttribute('highlight');
    }

    set highlight(highlight) {
        this.setAttribute('highlight', highlight);
    }

    static get observedAttributes() {
        return ['highlight'];
    }

    attributeChangedCallback(attibute, oldVal, newVal) {
        var groupCard = this.querySelector('.group-card');

        switch(attibute) {
            case 'highlight':
                groupCard.innerHTML = `${this.imageURL}`;
        }
    }

    connectedCallback() {
        let template = `
            <div class="card">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        `;


        this.innerHTML = template;
    }
}