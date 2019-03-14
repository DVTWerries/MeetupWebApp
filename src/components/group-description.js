export default class GroupDescription extends HTMLElement {
    constructor() {
        super();
    }

    get description() {
        return this.getAttribute('description');
    }

    set description(description) {
        this.setAttribute('description', description);
    }

    static get observedAttributes() {
        return ['description'];
    }

    connectedCallback() {
        let template = `
                <div class="accordion" id="accordionExample">
                    <div class="card">
                        <div class="card-header" id="headingOne">
                            <h2 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Description
                            </button>
                            </h2>
                        </div>
                
                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body">
                                ${this.description}
                            </div>
                        </div>
                    </div>
                </div>
        `;


        this.innerHTML = template;
    }
}