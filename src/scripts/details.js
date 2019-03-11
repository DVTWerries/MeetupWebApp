import 'bootstrap';
import '../styles/details.scss';
import * as $ from 'jquery';

import ErrorModal from '../components/error-modal';
import LoadingSpinner from '../components/spinner';
import GroupDiscription from '../components/group-description';
import Table from '../components/table';


const apiKey = '1345494f356d223964372b57807f1f79';
const baseURl = 'https://api.meetup.com';
const herokuAppURL = 'https://cors-anywhere.herokuapp.com/';
let $body = $('.body');

customElements.define("error-modal", ErrorModal);
customElements.define("loading-spinner", LoadingSpinner);
customElements.define("group-discription", GroupDiscription);
customElements.define("member-table", Table);

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
        },
        success: function (data) {
            carousalInner.append(`
                <group-discription class="carousel-item active" description="${data.description}"></group-discription>
                <member-table class="carousel-item"></member-table>
                <div class="carousel-item meetup-container"></div>
                <div class="carousel-item highligth-container"></div>
                <div class="carousel-item" discussion-container></div>
            `);
            getMembers(urlParameter);
            getMeetups(urlParameter);
            getHighlights(urlParameter);
            getDiscussions(urlParameter);
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
    let tableBody = $('tbody');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/${urlParameter[1]}/members?key=${apiKey}`,
        success: function (data) {
            $.each(data, function(i, item) {
                let imageUrl = item.photo === undefined ? "..." : item.photo.thumb_link === undefined ? item.photo.photo.link : item.photo.highres_link;
                tableBody.append(`
                    <tr>
                        <th scope="row">${item.id}</th>
                        <td><img src="${imageUrl}" width="100px" height="80px"></td>
                        <td>${item.name}</td>
                        <td>${item.joined}</td>
                    </tr>
                `);
            });  
        },
    });
}

function getMeetups(urlParameter) {
    let tableBody = $('tbody');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/${urlParameter[1]}/members?key=${apiKey}`,
        success: function (data) {
            $.each(data, function(i, item) {
                let imageUrl = item.photo === undefined ? "..." : item.photo.thumb_link === undefined ? item.photo.photo.link : item.photo.highres_link;
                tableBody.append(`
                    <tr>
                        <th scope="row">${item.id}</th>
                        <td></td>
                        <td>${item.name}</td>
                        <td>${item.joined}</td>
                    </tr>
                `);
            });  
        },
    });
}

function getHighlights(urlParameter) {
    let tableBody = $('tbody');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/${urlParameter[1]}/members?key=${apiKey}`,
        success: function (data) {
            $.each(data, function(i, item) {
                let imageUrl = item.photo === undefined ? "..." : item.photo.thumb_link === undefined ? item.photo.photo.link : item.photo.highres_link;
                tableBody.append(`
                    <tr>
                        <th scope="row">${item.id}</th>
                        <td></td>
                        <td>${item.name}</td>
                        <td>${item.joined}</td>
                    </tr>
                `);
            });  
        },
    });
}


function getDiscussions(urlParameter) {
    let tableBody = $('tbody');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/${urlParameter[1]}/members?key=${apiKey}`,
        success: function (data) {
            $.each(data, function(i, item) {
                let imageUrl = item.photo === undefined ? "..." : item.photo.thumb_link === undefined ? item.photo.photo.link : item.photo.highres_link;
                tableBody.append(`
                    <tr>
                        <th scope="row">${item.id}</th>
                        <td></td>
                        <td>${item.name}</td>
                        <td>${item.joined}</td>
                    </tr>
                `);
            });  
        },
    });
}