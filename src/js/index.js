window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    let forms = require('./parts/forms'),
        pictures = require('./parts/pictures'),
        popups = require('./parts/popups'),
        tabs = require('./parts/tabs'),
        timer = require('./parts/timer');

        forms();
        pictures();
        popups();
        tabs();
        timer();
   
});
