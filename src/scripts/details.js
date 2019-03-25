import '../styles/details.scss';
import 'bootstrap';
import * as $ from 'jquery';
import 'webpack-icons-installer';

import ErrorModal from '../components/error-modal';
import LoadingSpinner from '../components/spinner';
import GroupDiscription from '../components/group-description';
import MemberCard from '../components/member-card';
import GroupPhoto from '../components/group-photo';
import GroupMeetup from '../components/group-meetup';
import Header from '../components/header';
import {apiKey, baseURl, herokuAppURL} from '../scripts/conf';
import {displayModal, removeSpinner} from './logic';
import {appendMemberCard, appendMeetupItem, appendPhotoItem, appendLoadingSpinner, 
        appendErrorModal} from './appender';
       
let loadingSpinner;
let urlParameter = window.location.href.split('?');

customElements.define("error-modal", ErrorModal);
customElements.define("loading-spinner", LoadingSpinner);
customElements.define("group-discription", GroupDiscription);
customElements.define("member-card", MemberCard);
customElements.define("group-photo", GroupPhoto);
customElements.define("group-meetup", GroupMeetup);
customElements.define("app-header", Header);

$('.carousel').carousel({
    interval: false
  });
  
$(function () {
    let carousalInner = $(`.carousel-inner`);
    let $body = $('.body');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/${urlParameter[1]}?key=${apiKey}`,
        beforeSend: function () {
            appendLoadingSpinner($body);
            loadingSpinner = document.querySelector('loading-spinner');
        },
        success: function (data) {
            let imageUrl = (data.group_photo ||
                data.key_photo ||
                data.meta_category.photo || {}).photo_link;
            carousalInner.append(`
                <div class="carousel-item active">
                    <app-header header="home"></app-header>
                    <div class="container">
                        <img src="${imageUrl}" class="d-block w-100 home-image" alt="...">
                        <div class="carousel-caption d-md-block">
                            <h5>${data.city}</h5>
                            <p>${data.members}</p>
                            <p>${data.organizer.name}</p>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <app-header header="description"></app-header>
                    <div class="container">
                        <group-discription description="${data.description}"></group-discription>
                    </div>
                </div>
                <div class="carousel-item">
                    <app-header header="members"></app-header>
                    <div class="container">
                        <div class="row members"></div>
                    </div>
                </div>
                <div class="carousel-item">
                    <app-header header="meetups"></app-header>
                    <div class="container">
                        <div class="row">
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                </button>

                                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <button class="dropdown-item" type="button" >Upcomming</button>
                                    <button class="dropdown-item" type="button" >Past</button>
                                </div>
                            </div>
                            <div class="card meetup-holder">
                                <div class="card-body meetup-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <app-header header="Photo's"></app-header>
                    <div class="container">
                        <div class="row photos-container"></div>
                    </div>
                </div>
            `);
            removeSpinner(loadingSpinner);
        },
        error: function(data) {
            removeSpinner(loadingSpinner);
            appendErrorModal(data);
            displayModal();
        }
    });
});



$(function () {
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/${urlParameter[1]}/members?key=${apiKey}`,
        success: function (data) {
            $.each(data, function(i, item) {
                const member = $('.members');
                let imageUrl = item.photo === undefined ? "..." :
                    item.photo.thumb_link;
                appendMemberCard(member, item, imageUrl);
            });  
        },
    });
});

$(function () {
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/${urlParameter[1]}/events?status=past&key=${apiKey}`,
        success: function (data) {
            let meetupContainer = $('.meetup-container');
            $.each(data, function(i, item) {
                appendMeetupItem(meetupContainer, item);
            });   
        },
    });
});

$(function () {
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/${urlParameter[1]}/photos?key=${apiKey}`,
        success: function (data) {
            let photoContainer = $('.photos-container');
            $.each(data, function(i, item) {
                appendPhotoItem(photoContainer, item);
            });
        },
    });
});