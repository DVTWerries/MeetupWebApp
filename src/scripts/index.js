import '../styles/index.scss';
import 'bootstrap';

var $ = require('jquery');

console.log('webpack starterkit');
var apiKey = '1345494f356d223964372b57807f1f79';
var baseURl = 'https://api.meetup.com';
var herokuAppURL = 'https://cors-anywhere.herokuapp.com/';
var pageItemCount;
var offset = 20;
var groupData;

$(function () {
    var $carousal = $('.carousel-inner');

    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/2/topic_categories?key=${apiKey}`,
        success: function (data) {
            $.each(data.results, function (i, item) {
                $carousal.append(`
                    <div class="carousel-item ${i == 0 ? 'active' : ''} container">
                        <h3>${item.name}</h3>
                        <img src="${item.icon.photo_link}" alt="Another slide"></div>
                    </div>`
                );
            });
        }
    });
});

$(function() {
    GetAllGroups();
} );

var GetAllGroups = function () {
    
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/find/groups?key=${apiKey}`,
        success: function(data) {
            groupData = data;
            Pagination(groupData);
            DisplayGroupCards(groupData, 0);
        }
    });
};

function DisplayGroupCards(data, value) {
    var $card = $('.card-holder');

    $.each(data, (i, item) => {
        let imageUrl = 
            (item.group_photo ||
                item.key_photo || 
                item.meta_category.photo || 
                { }).photo_link;

        if (value >= offset) {
            return;
        }

        $card.append(`
            <div class="card col-sm-4 col-md-3 col-lg-2 mx-2">
                <img class="card-img-top" src="${ typeof item.group_photo !== "undefined" ? item.group_photo.photo_link 
                        : typeof  item.key_photo !== "undefined" ? item.key_photo.photo_link : item.meta_category.photo.photo_link}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                </div>
            </div>`
        );

        value++;
    });
}

function Pagination(data) {
    var $pagination = $('.pagination');
    pageItemCount = data.length / 20;

    for (var i = 0; i < pageItemCount ; i++) {
        $pagination.append(
            `<li id="${i}" class="page-item"><a class="page-link">${i}</a></li>`);
    }

    var pageItems = document.getElementsByClassName("page-item");

    for (var i = 0; i < pageItems.length; i++) {
        pageItems[i].addEventListener("click", PaginationResponse, false);
    }
}

function PaginationResponse() {
    var elementValue = document.getElementsByClassName("page-link").value;
    console.log(elementValue);

    for (var i = 0; i < pageItemCount; i++) {
        if (elementValue == i) {
            DisplayGroupCards(groupData, elementValue * 20);
        }
    }
};

$('.card').on('click', function () {
    alert("hello");
});

$('.category').on('click', function () {
    alert("hello");
});