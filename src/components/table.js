export default class Table extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let template = `
                <table class="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Profile picture</th>
                            <th scope="col">Name & Surname</th>
                            <th scope="col">Joined</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
        `;
        this.innerHTML = template;
    }
}