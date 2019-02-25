import '../styles/index.scss';
import 'bootstrap';
import * as $ from 'jquery';

const apiKey = '1345494f356d223964372b57807f1f79';
const baseURl = 'https://api.meetup.com';
const herokuAppURL = 'https://cors-anywhere.herokuapp.com/';

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
            $.each(data, function (i, item) {
                let imageUrl = (item.group_photo || 
                    item.key_photo ||
                    item.meta_category.photo || {}).photo_link;
                    console.log(imageUrl);
                $card.append(`
                <div class="card col-sm-4 col-md-3 col-lg-2 mx-2">
                    <img class="card-img-top" src="${imageUrl}"
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.description}</p>
                    </div>
                </div>`
                );
            });
        }
    });
});