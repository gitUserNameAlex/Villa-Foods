//добавляем отзывы
let comments = [];
loadComments();

document.getElementById('comment-add').onclick = function(){
    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body');

    let comment = {
        name : commentName.value,
        body : commentBody.value,
        time : Math.floor(Date.now() / 1000)
    }

    commentName.value = '';
    commentBody.value = '';

    comments.push(comment);
    saveComments();
    showComments();
}

function saveComments(){
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments (){
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function(item){
        out += `<div class="inside">`;
        out += `<p class="time-text"><em>${timeConverter(item.time)}</em></p>`;
        out += `<p class="alert-primary" role="alert">${item.name}</p>`;
        out += `<p class="alert-success" role="alert">${item.body}</p>`;
        out += `</div>`
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

//заявка на обратный звонок
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