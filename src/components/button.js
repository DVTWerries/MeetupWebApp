import * as $ from 'jquery';

export default class Button extends HTMLElement {
    constructor() {
        super();
    }

    get categoryName() {
        return this.getAttribute('categoryName');
    }

    set categoryName(categoryName) {
        this.setAttribute('categoryName', categoryName);
    }

    static get observedAttributes() {
        return ['categoryName'];
    }

    attributeChangedCallback(attibute, oldVal, newVal) {
        var buttonCategory = this.querySelector('.btnCategory');
        switch(attibute) {
            case 'categoryName':
                buttonCategory.innerText = `${this.categoryName}`;
        }
    }

    connectedCallback() {
        let template = `
            <button type="button" 
                    class="btn btn-outline-secondary btnCategory">
                    ${this.categoryName || "Select another category"}
            </button>
        `;

        this.innerHTML = template;
    }
}