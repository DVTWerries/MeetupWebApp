import '../styles/index.scss';
import 'bootstrap';
import * as $ from 'jquery';

const apiKey = '1345494f356d223964372b57807f1f79';
const baseURl = 'https://api.meetup.com';
const herokuAppURL = 'https://cors-anywhere.herokuapp.com/';
let $body = $('.body');

$(function () {
    let $carousal = $('.carousel-inner');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/2/topic_categories?key=${apiKey}`,
        beforeSend: function () {
            $body.append(`
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            `);
        },
        success: function (data) {
            $.each(data.results, function (i, item) {
                $carousal.append(`
                    <div class="carousel-item ${i == 0 ? 'active' : ''} container">
                        <img src="${item.icon.photo_link}" alt="Another slide"></div>
                    </div>
                `);
            });
        },
        error: function () {
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
});

$(function () {
    let $cardGroup = $('.card-group');

    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/find/groups?key=${apiKey}`,
        success: function (data) {
            $.each(data, function (i, item) {
                let imageUrl = (item.group_photo ||
                    item.key_photo ||
                    item.meta_category.photo || {}).photo_link;
                $cardGroup.append(`
                    <div class="card col-lg-3 col-md-4 col-sm-6" >
                        <img src="${imageUrl}" class="card-img-top" alt="...">
                        <h5 class="card-title">${item.name}</h5>
                        <div class="card-footer">
                            <a href="#" class="btn btn-primary btn-block">View</a>
                        </div>
                    </div>
                `);
            });

        }, 
        error: function () {
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

});

