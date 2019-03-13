export default class MemberCard extends HTMLElement {
    constructor() {
        super();
    }

    get image() {
        return this.getAttribute('image');
    }

    get name() {
        return this.getAttribute('name');
    }

    set image(image) {
        this.setAttribute('image', image);
    }

    set name(name) {
        this.setAttribute('name', name);
    }

    static get observedAttributes() {
        return ['image', 'name'];
    }

    connectedCallback() {
        let template = `
            <div class="card">
                <img class="card-img-top" src="${this.image}" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${this.name}</h5>
                    <a href="#" class="btn btn-primary">View</a>
                </div>
            </div>
        `;
        this.innerHTML = template;
    }
}