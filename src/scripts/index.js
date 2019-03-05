import '../styles/index.scss';
import 'bootstrap';
import * as $ from 'jquery';

const apiKey = '1345494f356d223964372b57807f1f79';
const baseURl = 'https://api.meetup.com';
const herokuAppURL = 'https://cors-anywhere.herokuapp.com/';
let $body = $('.body');
let $firstContent = $('#first-content');
let $secondContent = $('#second-content');

$(function () {
    let $listGroup = $('.list-group-flush');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/2/topic_categories?key=${apiKey}`,
        beforeSend: function () {
            $body.append(`
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            `);
            $firstContent.addClass(".loading-screen");
        },
        success: function (data) {
            let buttons = '';
            let selectedButton = '';
            let anotehrCategory  = '';
            $.each(data.results, function (i, item) {
                buttons = $(`<button type="button" class="btn btn-outline-secondary btnCategory">${item.name}</button>`)
                .click(function () {

                    getGroups(item.category_ids[0]);
                });
                $secondContent.append(buttons);
                $listGroup.append(buttons);
            });
            $(".spinner-border").remove();
            $firstContent.removeClass(".loading-screen");
            $secondContent.css("display", "none");
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
            $(".spinner-border").remove();
            $('#exampleModalCenter').modal('show');
        }
    });
});

function getGroups(category_id) {
    let $cardHolder = $('.card-holder');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/find/groups?category=${category_id}&key=${apiKey}`,
        beforeSend: function () {
            $("#first-content").remove();
            $body.append(`
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            `);
            $secondContent.addClass(".loading-screen");
        },
        success: function (data) {
            $.each(data, function (i, item) {
                let imageUrl = (item.group_photo ||
                    item.key_photo ||
                    item.meta_category.photo || {}).photo_link;
                $cardHolder.append(`
                    <div class="col-lg-4 col-md-6 col-6 loading">
                        <a href="http://localhost:8080/details.html?${item.urlname}" class="d-block mb-4 h-100">
                            <img class="img-fluid img-thumbnail" src="${imageUrl}" alt="">
                        </a>
                    </div>
                `);
            });
            $secondContent.removeClass(".loading-screen");
            $secondContent.css("display", "flex");
            $(".spinner-border").remove();

        }, 
        error: function () {
            if($('#exampleModalCenter') === null) {
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
            `   );
                $('#exampleModalCenter').modal('show');
            }
            $(".spinner-border").remove();
            
        }
    });

};

$("#menu-toggle").click(function(e) {
    $(".sidebar-container").toggleClass("center");
    //$("#card-container").toggleClass("center");
  });

