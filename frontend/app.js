"use strict";

import Render from './components/render/render';
import Handlers from './components/handlers/handlers';

new Render({
    el: document.querySelector('body')
});

new Handlers({
    inputIcon: document.querySelector('.input-icon'),
    inputField: document.querySelector('.search-input')
});