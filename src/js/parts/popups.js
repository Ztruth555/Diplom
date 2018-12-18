function popUps() {

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

module.exports = popUps;