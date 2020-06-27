var dialog = document.querySelector('.request-dialog');
document.querySelector('#show').onclick = function() {
    dialog.show();
};
document.querySelector('#close').onclick = function() {
    dialog.close();
};

function SendPhone() {
    var element = document.querySelector("#phone-input");
    var value = element.value;

    if (value == "") {
        alert("Введите номер телефона");
        return;
    }

    var xhr = new XMLHttpRequest();

    var body = 'phone=' + encodeURIComponent(value);
    xhr.open("POST", '/server/callus/', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.send(body);

    document.querySelector("#phonedialog").style.display = "none";
}