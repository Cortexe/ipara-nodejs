document.getElementById("pay").addEventListener("click", function (e) {
    var userId = document.getElementsByName("userId")[0].value;
    var cardId = document.getElementsByName("cardId")[0].value;
    var installment = document.getElementsByName("installment")[0].value;

    if (!userId || !cardId || !installment) return alert("Eksik alanlar var !");

    var target = e.currentTarget;

    target.innerHTML = "Lütfen bekleyiniz..."
    target.disabled = true;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api//payment-with-wallet", true);
    ajax.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    ajax.onload = function () {
        target.innerHTML = "API PAYMENT ILE ODE"
        target.disabled = false;
        var data = JSON.parse(ajax.response)
        if (data.error) return alert(data.error)
        document.getElementById("result").innerHTML = JSON.stringify(data).replace(new RegExp(",", 'g'), ',\n')
    }
    ajax.send(JSON.stringify({
        userId : userId,
        cardId : cardId,
        installment : installment
    }))
})