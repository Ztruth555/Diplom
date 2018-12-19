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

       // let finalJson = JSON.stringify(calcData);
       let formData = new FormData(this);
       let obj = {};
       formData.forEach((value, key) => obj[key] = value);
       let json = JSON.stringify(obj);


        function postFinalData(data) {
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

                request.send(data);
            });
        }

        function clearInput() {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        }

        postFinalData(json)
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