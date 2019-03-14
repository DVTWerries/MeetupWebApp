import '../styles/details.scss';
import 'bootstrap';
import * as $ from 'jquery';

import ErrorModal from '../components/error-modal';
import LoadingSpinner from '../components/spinner';
import GroupDiscription from '../components/group-description';
import MemberCard from '../components/member-card';
import GroupHighlight from '../components/group-highlight';
import GroupMeetup from '../components/group-meetup';
import Header from '../components/header';


const apiKey = '1345494f356d223964372b57807f1f79';
const baseURl = 'https://api.meetup.com';
const herokuAppURL = 'https://cors-anywhere.herokuapp.com/';
let $body = $('.body');
let loadingSpinner;

customElements.define("error-modal", ErrorModal);
customElements.define("loading-spinner", LoadingSpinner);
customElements.define("group-discription", GroupDiscription);
customElements.define("member-card", MemberCard);
customElements.define("group-highlight", GroupHighlight);
customElements.define("group-meetup", GroupMeetup);
customElements.define("app-header", Header);

$('.carousel').carousel({
    interval: false
  });
  
$(function () {
    let carousalInner = $(`.carousel-inner`);
    let urlParameter = window.location.href.split('?');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/${urlParameter[1]}?key=${apiKey}`,
        beforeSend: function () {
            $body.append(`
                <loading-spinner></loading-spinner>
            `);
            loadingSpinner = document.querySelector('loading-spinner');
        },
        success: function (data) {
            let imageUrl = (data.group_photo ||
                data.key_photo ||
                data.meta_category.photo || {}).photo_link;
            carousalInner.append(`
                <div class="carousel-item active" about-us-container>
                    <app-header header="home"></app-header>
                    <div class="container">
                        <img src="${imageUrl}" class="d-block w-100" alt="...">
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
                        <div class="row meetup-container"></div>
                    </div>
                </div>
                <div class="carousel-item">
                    <app-header header="highlights"></app-header>
                    <div class="container">
                        <div class="row highlight-container"></div>
                    </div>
                </div>
            `);
            getMembers(urlParameter);
            getMeetups(urlParameter);
            getHighlights(urlParameter);
        },
        error: function(data) {
            $body.append(`
                <error-modal error="${data.responseText}"></error-modal>
            `);
            $(".spinner-border").remove();
            $('#exampleModalCenter').modal('show');
        }
    });
});

function getMembers(urlParameter) {
    let member = $('.members');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/${urlParameter[1]}/members?key=${apiKey}`,
        success: function (data) {
            $.each(data, function(i, item) {
                let imageUrl = item.photo === undefined ? "..." :
                    item.photo.thumb_link;
                member.append(`
                <member-card class="col-lg-4 col-md-4 col-sm-6 col-6"
                        image="${imageUrl}" 
                        name="${item.name}">
                </member-card>
                `);
            });  
        },
    });
}

function getMeetups(urlParameter) {
    let meetupContainer = $('.meetup-container');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/${urlParameter[1]}/events?status=past&key=${apiKey}`,
        success: function (data) {
            $.each(data, function(i, item) {
                meetupContainer.append(`
                    <group-meetup class="col-md-4"></group-meetup>
                `);
            });   
        },
    });
}

function getHighlights(urlParameter) {
    let highlightContainer = $('.highlight-container');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/${urlParameter[1]}/photos?key=${apiKey}`,
        success: function (data) {
            $.each(data, function(i, item) {
                highlightContainer.append(`
                    <group-highlight class="col-md-4"></group-highlight>
                `);
            });
            loadingSpinner.setAttribute('display', 'none');  
        },
    });
}