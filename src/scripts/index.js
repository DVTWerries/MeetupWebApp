import '../styles/index.scss';
import 'bootstrap';
import * as $ from 'jquery';
import 'webpack-icons-installer';

import GroupCard from '../components/group-card';
import ErrorModal from '../components/error-modal';
import LoadingSpinner from '../components/spinner';
import Button from '../components/button';
import Header from '../components/header';
import {apiKey, baseURl, herokuAppURL} from '../scripts/conf';
import { displayModal, removeSpinner, displaySpinner, addLoadingContent, removeLoadingScreen, hideSecondContent, displaySecondContent, removeFirstContent } from './logic';
import { appendLoadingSpinner, appendErrorModal, appendGroupCard, } from './appender';

let header;
let loadingSpinner;

customElements.define("group-card", GroupCard);
customElements.define("error-modal", ErrorModal);
customElements.define("loading-spinner", LoadingSpinner);
customElements.define("app-button", Button);
customElements.define("app-header", Header);

$(function () {
    let $listGroup = $('.list-group-flush');
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/2/topic_categories?key=${apiKey}`,
        beforeSend: function () {
            appendLoadingSpinner();
            loadingSpinner = document.querySelector('loading-spinner');
            addLoadingContent('landingPage');
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
            removeSpinner(loadingSpinner);
            removeLoadingScreen('landingPage');
            hideSecondContent();
        },
        error: function (data) {
            removeSpinner(loadingSpinner);
            appendErrorModal(data);
            displayModal();
        }
    });
});

function getGroups(category_id, selectedCategory) {
    $.ajax({
        type: 'GET',
        url: `${herokuAppURL}${baseURl}/find/groups?category=${category_id}&key=${apiKey}`,
        beforeSend: function () {
            header = document.querySelector('app-header');
            displaySpinner(loadingSpinner);
            addLoadingContent('secondContent');
            removeFirstContent();
        },
        success: function (data) {
            header.setAttribute('header', selectedCategory);
            let $cardHolder = $('.card-holder');
            $.each(data, function (i, item) {
                let imageUrl = (item.group_photo ||
                    item.key_photo ||
                    item.meta_category.photo || {}).photo_link;
                appendGroupCard($cardHolder, item, imageUrl);
            });
            removeSpinner(loadingSpinner);
            displaySecondContent(); 
            removeLoadingScreen('secondContent'); 
             
        }, 
        error: function (data) {
            appendErrorModal(data);
            displayModal();
            removeSpinner(loadingSpinner);
        }
    });

};

