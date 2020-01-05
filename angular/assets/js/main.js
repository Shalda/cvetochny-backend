"use strict";

$(document).ready(function () {
    mobileAdaptive();                       // some mobile optomization
    spikmi();                               // callback from spikmi service
    deliverySelect()
});
function mobileAdaptive() {
    if (window.matchMedia('(max-width: 768px)').matches) {
           //video tag delete on main
        let video = document.getElementById('videoHero');
        if (video) {
            video.remove();
        }
    }
}

function spikmi() {
    if (window.matchMedia('(max-width: 768px)').matches) {
        let spikmiElem = document.createElement('script');
        spikmiElem.setAttribute('type', 'text/javascript');
        spikmiElem.setAttribute('src', 'https://spikmi.com/Widget?Id=603');
        let parentBody = document.body;
        parentBody.appendChild(spikmiElem);
    }
}
function deliverySelect() {
    var deliveryAddressElem = $(".delivery-address");
    var friendDeliveryElem = $(".friend-delivery");
    friendDeliveryElem.hide();
    deliveryAddressElem.hide();

    $(".receiver-box input").on("click", function () {
        var checkedVal = $(".receiver-box input:checked").val()
        if (checkedVal == "friend") {

            friendDeliveryElem.slideDown();
        } else friendDeliveryElem.slideUp();
    });

    $("#deliveryWay").change(function () {
        var val = $(this).val();
        if (val == "Доставка курьером") {
            deliveryAddressElem.slideDown();
        } else deliveryAddressElem.slideUp();
    });

}


