import * as $ from 'jquery';

const $firstContent = $('#first-content');
const $secondContent = $('#second-content');

export function displaySpinner(loadingSpinner) {
    loadingSpinner.setAttribute('display', 'block'); 
}

export function removeSpinner(loadingSpinner) {
    loadingSpinner.setAttribute('display', 'none');
}

export function displayModal() {
    $('#exampleModalCenter').modal('show');
}

export function addLoadingContent(value) {
    if(value === 'landingPage') {
        $firstContent.addClass(".loading-screen");
    }
    else{
        $secondContent.addClass(".loading-screen");
    } 
}

export function displaySecondContent() {
    $secondContent.css("display", "flex");
}

export function hideSecondContent() {
    $secondContent.css("display", "none");
}

export function removeLoadingScreen(value) {
    if(value === 'landingPage') {
        $firstContent.removeClass(".loading-screen");
    }
    else{
        $secondContent.removeClass(".loading-screen");
         
    }
}

export function removeFirstContent() {
    $("#first-content").remove(); 
}
