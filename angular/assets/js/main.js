"use strict";

$(document).ready(function () {
    mobileAdaptive();                       // some mobile optomization
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


