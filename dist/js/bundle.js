/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    let forms = __webpack_require__(/*! ./parts/forms */ "./src/js/parts/forms.js"),
        pictures = __webpack_require__(/*! ./parts/pictures */ "./src/js/parts/pictures.js"),
        popups = __webpack_require__(/*! ./parts/popups */ "./src/js/parts/popups.js"),
        tabs = __webpack_require__(/*! ./parts/tabs */ "./src/js/parts/tabs.js"),
        timer = __webpack_require__(/*! ./parts/timer */ "./src/js/parts/timer.js");

        forms();
        pictures();
        popups();
        tabs();
        timer();
   
});


/***/ }),

/***/ "./src/js/parts/forms.js":
/*!*******************************!*\
  !*** ./src/js/parts/forms.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function forms() {
    let form = document.querySelectorAll('.form'),
        phoneInput = document.querySelectorAll('.user_phone'),
        input = document.querySelectorAll('input'),
        statusMessage = document.createElement('div');
        
        for (let i = 0; i < phoneInput.length; i++) {
            phoneInput[i].addEventListener('input', function () {
                this.value = this.value.replace(/[^0-9+]/ig, '');
            });
        }
        
        let message = {
            loading: 'Загрузка',
            success: 'Спасибо мы с вами свяжемся!',
            failure: 'Что-то пошло не так...'
        };
        statusMessage.classList.add('status');
        for(let i = 0; i < form.length; i++){
            postQuestion(form[i]);
        }

        function postQuestion(a){
            a.addEventListener('submit', function(event){
                event.preventDefault();
                a.appendChild(statusMessage);
    
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
                let formData = new FormData(a);
                request.send(formData);
    
                request.addEventListener('readystatechange', function() {
                    if(request.readyState < 4){
                        statusMessage.textContent = message.loadind;
                    } else if(request.readyState === 4 && request.status == 200){
                        statusMessage.textContent = message.success;
                    } else {
                        statusMessage.textContent = message.failure;
                    }
                });
    
            });
        }







    // Calcalator

    let popUpCalc = document.querySelector('.popup_calc'),
        glazingBtn = document.querySelectorAll('.glazing_price_btn'),
        closeCalc = document.querySelector('.popup_calc_close'),
        balconTabs = document.querySelectorAll('.balc_tab'),
        pictures = document.querySelector('.big_img'),
        balconContents = pictures.querySelectorAll('img'),
        infoBalcon = document.querySelector('.balcon_icons'),
        calcButton = document.querySelector('.popup_calc_button'),
        calcProfile = document.querySelector('.popup_calc_profile'),
        calcMiddleButton = document.querySelector('.popup_calc_profile_button'),
        calcEnd = document.querySelector('.popup_calc_end'),
        finalClose = document.querySelector('.popup_calc_end_close'),
        middleClose = document.querySelector('.popup_calc_profile_close'),
        width = document.querySelector('#width'),
        height = document.querySelector('#height'),
        checkbox = document.querySelectorAll('.checkbox-custom'),
        checkboxTag = document.querySelectorAll('.checkbox'),
        finalButton = document.querySelector('.final');
        overlay = document.querySelector('.overlay');

    let calcData = {};



    width.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/ig, '');
    });

    height.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/ig, '');
    });



    function openCalcModal() {
        popUpCalc.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeCalcModal() {
        popUpCalc.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    for (let i = 0; i < glazingBtn.length; i++) {
        glazingBtn[i].addEventListener('click', openCalcModal);


    }


    closeCalc.addEventListener('click', closeCalcModal);




    function hideCalcContent(a) {
        for (let i = a; i < balconContents.length; i++) {
            balconContents[i].classList.remove('show');
            balconContents[i].classList.add('hide');
        }
    }

    hideCalcContent(1);

    function showCalcContent(b) {
        if (balconContents[b].classList.contains('hide')) {
            balconContents[b].classList.remove('hide');
            balconContents[b].classList.add('show');
        }
    }

    infoBalcon.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('balc_tab')) {
            for (let i = 0; i < balconTabs.length; i++) {
                if (target == balconTabs[i]) {
                    hideCalcContent(0);
                    showCalcContent(i);
                    break;
                }
            }
        }
    });


    calcButton.addEventListener('click', function () {
        calcProfile.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        popUpCalc.style.display = 'none';
        calcData.calcWidth = width.value;
        calcData.calcHeight = height.value;

    });

    calcMiddleButton.addEventListener('click', function () {
        calcEnd.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        calcProfile.style.display = 'none';
        calcData.cold = checkboxTag[0].checked;
        calcData.warm = checkboxTag[1].checked;
        calcData.type = document.querySelector('#view_type').value;


    });

    finalButton.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector('.final_form').appendChild(statusMessage);
        calcData.name = document.querySelector('.final_name').value;
        calcData.phone = document.querySelector('.final_phone').value;
        document.body.style.overflow = '';

        let finalJson = JSON.stringify(calcData);


        function postFinalData() {
            return new Promise(function (resolve, reject) {
                let request = new XMLHttpRequest();

                request.open('POST', 'server.php');
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                request.onreadystatechange = function () {
                    if (request.readyState < 4) {
                        resolve();
                    } else if (request.readyState === 4) {
                        if (request.status == 200 && request.status < 3) {
                            resolve();
                        } else {
                            reject();
                        }
                    }
                }

                request.send(finalJson);
            });
        }

        function clearInput() {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        }

        postFinalData(calcData)
            .then(() => statusMessage.innerHTML = message.loading)
            .then(() => statusMessage.innerHTML = message.success)
            .catch(() => statusMessage.innerHTML = message.failure)
            .then(clearInput);
    });

    finalClose.addEventListener('click', function () {
        calcEnd.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    });

    middleClose.addEventListener('click', function () {
        calcProfile.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    });


    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener('click', function () {
            for (let i = 0; i < checkboxTag.length; i++) {
                checkboxTag[i].checked = false;
            }
            this.checked = true;
        });
    }
}
module.exports = forms;

/***/ }),

/***/ "./src/js/parts/pictures.js":
/*!**********************************!*\
  !*** ./src/js/parts/pictures.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

    // Pictures

    function pictures() {

        let shown = document.querySelector('.overlay'),
            img = document.createElement("IMG"),
            imgLink = document.querySelectorAll('.img_link');


        function closeImage() {
            img.style.display = 'none';
            overlay.style.display = 'none';
        }


        for (let i = 0; i < imgLink.length; i++) {
            imgLink[i].addEventListener('click', function () {
                img.setAttribute("src", "img/our_works/big_img/" + (i + 1) + ".png");
                img.classList.add('img_works');

                document.body.appendChild(img);
                img.style.display = 'block';
                overlay.style.display = 'block';

            });

        }


        for (let i = 0; i < imgLink.length; i++) {
            img.addEventListener('click', closeImage);
        }

        shown.addEventListener('click', closeImage);

    }
    
    module.exports = pictures;


/***/ }),

/***/ "./src/js/parts/popups.js":
/*!********************************!*\
  !*** ./src/js/parts/popups.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function popups() {

    // Popup

    let headerBtn = document.querySelector('.header_btn'),
        popupEn = document.querySelector('.popup_engineer'),
        popup = document.querySelector('.popup'),
        overlay = document.querySelector('.overlay'),
        close = document.getElementsByClassName('popup_close')[0],
        closeEn = document.getElementsByClassName('popup_close')[1],
        phoneLink = document.getElementsByClassName('phone_link');


    //  Modal Popup

    window.setTimeout(function () {
        popup.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }, 60000);

    function closeModal() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    close.addEventListener('click', closeModal);
    popup.addEventListener('click', function (event) {

        if (event.target.closest(".popup-dialog")) return;
        closeModal();

    });


    // Eng Popup

    function openEnModal() {
        popupEn.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeEnModal() {
        popupEn.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }


    headerBtn.addEventListener('click', openEnModal);

    for (let i = 0; i < phoneLink.length; i++) {
        phoneLink[i].addEventListener('click', openEnModal);
    }

    closeEn.addEventListener('click', closeEnModal);
    popupEn.addEventListener('click', function (event) {

        if (event.target.closest(".popup_dialog")) return;
        closeEnModal();

    });

}

module.exports = popups;

/***/ }),

/***/ "./src/js/parts/tabs.js":
/*!******************************!*\
  !*** ./src/js/parts/tabs.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {

let tab = document.querySelectorAll('.tab_link'),
    line = document.querySelectorAll('.line'),
    slider = document.querySelector('.glazing_slider'),
    tabContent = document.querySelectorAll('.tab_content'),
    decTab = document.querySelectorAll('.dec_tab'),
    decContent = document.querySelector('.decoration_slider'),
    decTabContent = document.querySelectorAll('.dec_tab_content');



function hideTabContent(a, tabContent, activeClass) {
    for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        if (tab[i].classList.contains(activeClass)) {
            tab[i].classList.remove(activeClass);
        }


    }
}


function hideTabContent(a, tabContent, activeClass) {
    for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        if (tab[i].classList.contains(activeClass)) {
            tab[i].classList.remove(activeClass);
        }


    }
}


function hideTabContent2(a, tabContent, activeClass, line) {
    for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        if (line[i].classList.contains(activeClass)) {
            line[i].classList.remove(activeClass);
        }


    }
}

hideTabContent(1, tabContent, 'active');
hideTabContent(1, decTabContent, 'after_click');

function showTabContent(b, tabContent, tab, activeClass) {
    if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
        tab[b].classList.add(activeClass);
    }
}

function showTabContent2(b, tabContent, activeClass, line) {
    if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
        line[b].classList.add(activeClass);
    }
}


slider.addEventListener('click', function (event) {
    let target = event.target;
    if (target && target.classList.contains('tab_link')) {
        for (let i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                hideTabContent(0, tabContent, 'active');
                showTabContent(i, tabContent, tab, 'active');
                break;
            }
        }
    }
});

decContent.addEventListener('click', function (event) {
    let target = event.target;
    if (target && target.classList.contains('dec_tab')) {
        for (let i = 0; i < decTab.length; i++) {
            if (target == decTab[i]) {
                hideTabContent2(0, decTabContent, 'after_click', line);
                showTabContent2(i, decTabContent, 'after_click', line);
                break;
            }
        }
    }
});
}
module.exports = tabs;


/***/ }),

/***/ "./src/js/parts/timer.js":
/*!*******************************!*\
  !*** ./src/js/parts/timer.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// timer

function timer() {

    let deadline = "2018-12-31 23:59:59";

    function getTimeRemaining(endtime) {

        function setZero(number) {
            if (number >= 0 && number < 10) {
                return '0' + number;
            } else {
                return number;
            }

        }
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = setZero(Math.floor((t / 1000) % 60)),
            minutes = setZero(Math.floor((t / 1000 / 60) % 60)),
            hours = setZero(Math.floor((t / 1000 / 60 / 60) % 24)),
            days = setZero(Math.floor((t / (1000 * 60 * 60 * 24))));

        if (t < 0) {
            seconds = '00';
            minutes = '00';
            hours = '00';
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    function setClock(endtime) {
        let days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);


        function updateClock() {
            let t = getTimeRemaining(endtime);
            days.textContent = t.days;
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
                timer.textContent = "00 : 00 : 00 : 00";
            }

        }
    }

    setClock(deadline);


}

module.exports = timer;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map