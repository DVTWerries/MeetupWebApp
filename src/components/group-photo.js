export default class GroupHighlight extends HTMLElement {
    constructor() {
        super();
    }

    get image() {
        return this.getAttribute('image');
    }

    set image(image) {
        this.setAttribute('image', image);
    }

    static get observedAttributes() {
        return ['image'];
    }

    connectedCallback() {
        let template = `
            <div class="image-container">
                <img class="group-photo" src="${this.image}" alt="sorry... picture could not load" />
            <div>
        `;


        this.innerHTML = template;
    }
}