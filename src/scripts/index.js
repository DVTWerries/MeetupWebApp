import '../styles/index.scss';
import 'bootstrap';

var $ = require('jquery');

console.log('webpack starterkit');
var apiKey = '1345494f356d223964372b57807f1f79';
var baseURl = 'https://api.meetup.com';
var herokuAppURL = 'https://cors-anywhere.herokuapp.com/';

 $(function () {
    var $carousal = $('.carousel-inner');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/2/topic_categories?key=${apiKey}`,
        success: function (data) {
            $.each(data.results, function (i, item) {
                $carousal.append(`
                    <div class="carousel-item ${i == 0 ? 'active' : ''} container">
                        <img src="${item.icon.photo_link}" alt="Another slide"></div>
                    </div>`
                );
            });
        }
    });
});

$(function () {
    var $card = $('.card-holder');

    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/find/groups?key=${apiKey}`,
        success: function (data) {
            console.log(data);
            $.each(data, function (i = 0, item) {
                $card.append(`
                <div class="card col-sm-4 col-md-3 col-lg-2 mx-2">
                    <img class="card-img-top" src="${ typeof item.group_photo !== "undefined" ? item.group_photo.photo_link 
                            : typeof  item.key_photo !== "undefined" ? item.key_photo.photo_link : item.meta_category.photo.photo_link}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text"></p>
                    </div>
                </div>`
                );
                i++;
            });
        }
    });
});

$('.card').on('click', function () {
    alert("hello");
});

$('.category').on('click', function () {
    alert("hello");
});

$('.category').on('click', function () {
    alert("hello");
});