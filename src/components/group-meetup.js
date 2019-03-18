export default class GroupMeetup extends HTMLElement {
    constructor() {
        super();
    }

    get name() {
        return this.getAttribute('name');
    }

    get date() {
        return this.getAttribute('date');
    }

    get RSVP() {
        return this.getAttribute('RSVP');
    }

    get venue() {
        return this.getAttribute('venue');
    }

    set name(name) {
        this.setAttribute('name', name);
    }

    set date(name) {
        this.setAttribute('date', date);
    }

    set RSVP(RSVP) {
        this.setAttribute('RSVP', RSVP);
    }

    set venue(venue) {
        this.setAttribute('venue', venue);
    }

    static get observedAttributes() {
        return ['name', 'date', 'RSVP', 'venue'];
    }

    connectedCallback() {
        let template = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title"><span class="glyphicon glyphicon-time"></span>${this.date}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${this.name}</h6>
                    <p><span class="glyphicon glyphicon-map-marker"></span>${this.venue}</p>
                    <div class="card-text">
                        <p><span class="glyphicon glyphicon-user"></span>${this.RSVP}</p>
                        <a href="#" class="card-link">view</a>
                    <div>
                </div>
            </div>
        `;


        this.innerHTML = template;
    }
}