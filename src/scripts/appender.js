export function appendMemberCard(member, item, imageUrl) {
    member.append(`
        <member-card class="col-lg-4 col-md-4 col-sm-6 col-6"
                image="${imageUrl}" 
                name="${item.name}">
        </member-card>
    `);
}

export function appendCarousalItem() {

}

export function appendMeetupItem(meetupContainer, item) {
    meetupContainer.append(`
        <group-meetup name="${item.name}" date="${item.local_date + " " + item.local_time}" RSVP="${item.yes_rsvp_count}" venue="${item.venue.name}" class="col-md-4"></group-meetup>
    `);
}

export function appendPhotoItem(photoContainer, item) {
    photoContainer.append(`
        <group-photo image="${item.photo_link}" class="col-lg-4 col-md-4 col-sm-4 col-6"></group-photo>
    `);
}

export function appendLoadingSpinner($body) {
    $body.append(`
        <loading-spinner></loading-spinner>
    `);
}

export function appendErrorModal(data) {
    if(document.querySelector('error-modal') === null) {
        $body.append(`
            <error-modal error="${data.responseText}"></error-modal>
        `);
    }
}

export function appendGroupCard($cardHolder, item, imageUrl) {
    $cardHolder.append(`
        <div class="col-lg-4 col-md-6 loading">
            <group-card urlName="${item.urlname}" imageURL="${imageUrl}"></group-card>
        </div>
    `);
}

export function appendButton() {
    $secondContent.append(`
        <app-button class="offset-lg-4 col-lg-4 offset-md-3 col-md-6 offset-sm-3 col-sm-6 col-12"></app-button>
    `);  
}