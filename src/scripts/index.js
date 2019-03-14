import '../styles/index.scss';
import 'bootstrap';
import * as $ from 'jquery';
import GroupCard from '../components/group-card';
import ErrorModal from '../components/error-modal';
import LoadingSpinner from '../components/spinner';
import Button from '../components/button';

const apiKey = '1345494f356d223964372b57807f1f79';
const baseURl = 'https://api.meetup.com';
const herokuAppURL = 'https://cors-anywhere.herokuapp.com/';
const $body = $('.body');
const $firstContent = $('#first-content');
const $secondContent = $('#second-content');
let loadingSpinner;

customElements.define("group-card", GroupCard);
customElements.define("error-modal", ErrorModal);
customElements.define("loading-spinner", LoadingSpinner);
customElements.define("app-button", Button);

$(function () {
    let $listGroup = $('.list-group-flush');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/2/topic_categories?key=${apiKey}`,
        beforeSend: function () {
            $body.append(`
                <loading-spinner></loading-spinner>
            `);
            $firstContent.addClass(".loading-screen");
            loadingSpinner = document.querySelector('loading-spinner');
        },
        success: function (data) {
            let buttons = '';
            $.each(data.results, function (i, item) {
                buttons = $(`<app-button categoryName="${item.name}"></app-button>`)
                .click(function () {
                    getGroups(item.category_ids[0], item.name);
                });
                $listGroup.append(buttons);
            });
            loadingSpinner.setAttribute('display', 'none');
            $firstContent.removeClass(".loading-screen");
            $secondContent.css("display", "none");
        },
        error: function (data) {
            $body.append(`
                <error-modal error="${data.responseText}"></error-modal>
            `);
            loadingSpinner.setAttribute('display', 'none');
            $('#exampleModalCenter').modal('show');
        }
    });
});

function getGroups(category_id, selectedCategory) {
    let $cardHolder = $('.card-holder');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/find/groups?category=${category_id}&key=${apiKey}`,
        beforeSend: function () {
            $("#first-content").remove();
            loadingSpinner.setAttribute('display', 'block');
            $secondContent.addClass(".loading-screen");
        },
        success: function (data) {
            $secondContent.append(`
                <app-button categoryName="${selectedCategory}" class="col-md-2"></app-button>
            `);
            $.each(data, function (i, item) {
                let imageUrl = (item.group_photo ||
                    item.key_photo ||
                    item.meta_category.photo || {}).photo_link;
                $cardHolder.append(`
                    <div class="col-lg-4 col-md-6 col-6 loading">
                        <group-card urlName="${item.urlname}" imageURL="${imageUrl}"></group-card>
                    </div>
                `);
            });
            $secondContent.append(`
                <app-button class="col-md-2"></app-button>
            `);
            $secondContent.removeClass(".loading-screen");
            $secondContent.css("display", "flex");
            loadingSpinner.setAttribute('display', 'none');
        }, 
        error: function (data) {
            if(document.querySelector('error-modal') === null) {
                $body.append(`
                    <error-modal error="${data.responseText}"></error-modal>
            `   );
                $('#exampleModalCenter').modal('show');
            }
            loadingSpinner.setAttribute('display', 'none');
        }
    });

};

$("#menu-toggle").click(function(e) {
    $(".sidebar-container").toggleClass("center");
    //$("#card-container").toggleClass("center");
  });

