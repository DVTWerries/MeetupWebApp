import 'bootstrap';
import '../styles/details.scss';
import ErrorModal from '../components/error-modal';
import LoadingSpinner from '../components/spinner';

import * as $ from 'jquery';

const apiKey = '1345494f356d223964372b57807f1f79';
const baseURl = 'https://api.meetup.com';
const herokuAppURL = 'https://cors-anywhere.herokuapp.com/';
let $body = $('.body');

customElements.define("error-modal", ErrorModal);
customElements.define("loading-spinner", LoadingSpinner);

$(function () {
    let urlParameter = window.location.href.split('?');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/${urlParameter[1]}?key=${apiKey}`,
        beforeSend: function () {
            $body.append(`
                <loading-spinner></loading-spinner>
            `);
        },
        success: function (data) {
            alert(data);
        },
        error: function(data) {
            $body.append(`
                <error-modal error="${data.responseText}"></error-modal>
            `);
            $(".spinner-border").remove();
            $('#exampleModalCenter').modal('show');
        }
    });
}, false);