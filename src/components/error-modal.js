export default class ErrorModal extends HTMLElement {
    constructor() {
        super();
    }

    get error() {
        console.log("getter");
        return this.getAttribute('error');
    }

    set error(error) {
        console.log("setter");
        this.setAttribute('error', error);
    }

    connectedCallback() {
        let template = `
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">Error! Sorry please try again!</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ${this.error}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Okay</button>
                        </div>
                    </div>
                </div>
            </div>
        `;


        this.innerHTML = template;
    }
}