"use strict";

import compiledTemplate from './template.hbs';

export default class Render {
    constructor(options) {
        this._el = options.el;

        this._render();
    }

    _render() {
        this._el.innerHTML = compiledTemplate();
    }
}