export default class LoadingSpinner extends HTMLElement {
    constructor() {
        super();

        this.display = 'block';
    }

    get display() {
        return this.getAttribute('display');
    }

    set display(display) {
        this.setAttribute('display', display);
    }

    static get observedAttributes() {
        return ['display'];
    }

    attributeChangedCallback(attibute, oldVal, newVal) {
        var spinner = this.querySelector('.spinner-border');

        switch(attibute) {
            case 'display':
                spinner.style.display = `${this.display}`;       
        }
    }

    connectedCallback() {
        let template = `
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        `;


        this.innerHTML = template;
    }
}