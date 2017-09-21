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
        let self = this;
        if (event.keyCode != 13) return;

        let text = this._inputField.value;

        this._sendRequest(text)
            .then(result => {
                document.querySelector('.articles-list').innerHTML = '<ul></ul>';;
                const ul = document.querySelector('.articles-list>ul');

                for (let item in result) {
                    let a = document.createElement('a');
                    ul.append(a);
                    a.href = 'https://en.wikipedia.org/?curid=' + result[item].pageid;
                    a.target = '_blank';

                    let li = document.createElement('li');
                    a.append(li);
                    let h1 = document.createElement('h1');
                    li.append(h1);
                    h1.innerHTML = result[item].title;
                    let p = document.createElement('p');
                    li.append(p);
                    p.innerHTML = result[item].extract;
                }
                // result.map(item => {
                //     let  a = document.createElement('a');
                //     console.log(item);
                //     a.href = item.
                //     ul.append();
                // });
            })
            .catch(error => {
                console.log(error);
            });
    }

    _sendRequest(text) {
        return fetch("https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=0&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=" + text)
            .then(response => {
                return response.json();
            })
            .then(data => {
                return data.query.pages;
            })
            .catch(error => {
                console.log(error);
            });
    }
}