"use strict";

export default class Handlers {
    constructor(options) {
        this._inputIcon = options.inputIcon;
        this._inputField = options.inputField;

        this._inputIcon.addEventListener('click', this._inputIconHandler.bind(this));
        this._inputField.addEventListener('keyup', this._inputFieldHandler.bind(this));
    }

    _inputIconHandler(event) {
        if (event.target.tagName === 'IMG') {
            event.target.closest('.search-icon').classList.toggle("visible");
            event.target.closest('.search-icon').classList.toggle("hidden");

            this._inputIcon.querySelector('.search-input').classList.toggle("visible");
            this._inputIcon.querySelector('.search-input').classList.toggle("hidden");
        }
    }

    _inputFieldHandler(event) {
        if (event.keyCode != 13) return;

        let text = this._inputField.value;

        this._sendRequest(text);
    }

    _sendRequest(text) {
        // let promise = fetch('https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + text + 'r&callback=angular.callbacks._2k')
        //     .then(response => {
        //         console.log(response.json());
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
        let promise = fetch("https://en.wikipedia.org/w/api.php?action=opensearch&search=" + text + "&format=json&callback=?")
            .then(response => {
                return response.text();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
    }
}