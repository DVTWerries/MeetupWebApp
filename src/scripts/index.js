import '../styles/index.scss';
import 'bootstrap';
import * as $ from 'jquery';

const apiKey = '1345494f356d223964372b57807f1f79';
const baseURl = 'https://api.meetup.com';
const herokuAppURL = 'https://cors-anywhere.herokuapp.com/';
let $body = $('.body');
let $container = $('.container-fluid');

$(function () {
    let $listGroup = $('.list-group');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/2/topic_categories?key=${apiKey}`,
        beforeSend: function () {
            $body.append(`
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            `);
            $container.addClass(".loading-screen");
        },
        success: function (data) {
            $.each(data.results, function (i, item) {
                $listGroup.append(`
                    <a href="#" class="list-group-item list-group-item-action bg-light loading">${item.name}</a>
                `);
            });
        },
        error: function () {
            $body.append(`
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            ...
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
    let $cardHolder = $('.card-holder');

    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/find/groups?key=${apiKey}`,
        success: function (data) {
            $.each(data, function (i, item) {
                let imageUrl = (item.group_photo ||
                    item.key_photo ||
                    item.meta_category.photo || {}).photo_link;
                $cardHolder.append(`
                    <div class="col-lg-4 col-md-4 col-6 loading">
                        <a href="http://localhost:8080/details.html?${item.urlname}" class="d-block mb-4 h-100">
                            <img class="img-fluid img-thumbnail" src="${imageUrl}" alt="">
                        </a>
                    </div>
                `);
            });
            $container.removeClass(".loading-screen");
            $container.css("display", "block");
            $(".spinner-border").remove();

        }, 
        error: function () {
            $body.append(`
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            ...
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            $('#exampleModalCenter').modal('show');
        }
    });

});

