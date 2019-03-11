export default class App extends HTMLElement {
    constructor() {
        super();

        this.state = {
            loading: true
        };
    }

    connectedCallback() {
        let template = `
            <a href="http://localhost:8080/details.html?${this.urlName}" class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="${this.imageURL}" alt="">
            </a>
        `;


        this.innerHTML = template;
    }
}