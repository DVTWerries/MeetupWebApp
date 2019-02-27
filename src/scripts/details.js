import 'bootstrap';
import '../styles/details.scss';

import * as $ from 'jquery';

const apiKey = '1345494f356d223964372b57807f1f79';
const baseURl = 'https://api.meetup.com';
const herokuAppURL = 'https://cors-anywhere.herokuapp.com/';
let $body = $('.body');

$(function () {
    let urlParameter = window.location.href.split('?');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/${urlParameter[1]}?key=${apiKey}`,
        beforeSend: function () {
            $body.append(`
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            `);
        },
        success: function (data) {
            alert(data);
        },
        error: function() {
            $body.append(`
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }
    });
}, false);