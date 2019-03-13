export default class GroupMeetup extends HTMLElement {
    constructor() {
        super();
    }

    get meetup() {
        return this.getAttribute('meetup');
    }

    set meetup(meetup) {
        this.setAttribute('meetup', meetup);
    }

    static get observedAttributes() {
        return ['meetup'];
    }

    attributeChangedCallback(attibute, oldVal, newVal) {
        var groupCard = this.querySelector('.group-card');

        switch(attibute) {
            case 'meetup':
                groupCard.innerHTML = `${this.imageURL}`;
        }
    }

    connectedCallback() {
        let template = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        `;


        this.innerHTML = template;
    }
}