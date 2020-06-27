 /**
   * 
   * @param {HTMLButtonElement} button 
   */
  function AddToBasket(button) {

    debugger;

     let id = button.dataset.id;
     //Положили картинку, заголовок и цену в переменную
     let itemImage = button.dataset.image;
     let itemTittle = button.dataset.title;
     let price = button.dataset.price;

   let tmp = localStorage.getItem("basket");


   if (tmp == null) {
       tmp = [
           {
               itemImage : itemImage,
               itemTittle : itemTittle,
               price : price,
               id : id,
               count : 1
           }
       ]
   } else {
       tmp = JSON.parse(tmp);

       let element = null;
       for (let i = 0; i < tmp.length; i++) {
           if (tmp[i].id == id) 
             element = tmp[i];
       }

       if (element == null) {
           element = {
               itemImage : itemImage,
               itemTittle : itemTittle,
               price : price,
               id : id,
               count : 1
           };

           tmp.push(element);
       } else {
           element.count ++;
       }
   }


   //превращаем объект tmp в JSON-док.
   let transformObj = JSON.stringify(tmp);

   //Добавляем в localStorage
   localStorage.setItem("basket", transformObj);

   //достаем объект из localStorage
   let returnObj = JSON.parse(localStorage.getItem("basket"))
}

function ShowBasket() {
    debugger;

    let tmp = localStorage.getItem("basket");
    document.querySelector(".empty-info").style.display = "block";

    if (tmp == null) return;

    let elements = JSON.parse(tmp);

    //Показываем кнопку "заказать"

    if (elements.length >= 1) {
        document.querySelector(".b-order-btn").style.display = "block";
    }
    else {
        document.querySelector(".b-order-btn").style.display = "none";
    }

    //Меняем фон

    if(elements.length >= 1) {
        document.body.style.backgroundColor = "linen";
    }
    else {
        document.body.style.backgroundColor = "white";
    }

    if (elements.length == 0) return;

    //Скрываем empty-info
    document.querySelector(".empty-info").style.display = "none";


    var rowSet = document.querySelector(".light");
    
    var container = document.createElement('div');
    container.className = "basket-row";
    rowSet.appendChild(container);
    
    for (let i = 0; i < elements.length; i++) {
        if (i != 0 && i % 3 == 0) {
            container = document.createElement('div');
            container.className = "basket-row";
            rowSet.appendChild(container);
        }

        let el = elements[i];

        var div = document.createElement('div');
        let str =   
                    '<div class="basket-item">' +
                    '<button class="delete-basket" onclick="DeleteElement(' + el.id + ')">Remove</button>' +
                    '<img class="item-image" src="' + el.itemImage + '" alt="">' +
                    '<h1 class="item-tittle">' + el.itemTittle + '</h1>' +
                    '<span class="price">' + (parseInt(el.price) * parseInt(el.count)) + "(" + el.count + ")" + '</span>' +
                    '</div>';


        div.innerHTML = str;

        container.appendChild(div);
    }
}

ShowBasket();

//Delete basket-item on click

function DeleteElement(id) {
    var basket = JSON.parse(localStorage.getItem("basket"));

    for (var i = 0; i < basket.length; i++) {
        if (basket[i].id == id) {
            if (basket[i].count > 1) {
                basket[i].count --;
            } else {
                basket.splice(i, 1);
            }
        }
    }

    localStorage.setItem("basket", JSON.stringify(basket));
    var elements = document.querySelectorAll(".basket-row");
    for (var i = 0; i < elements.length; i++)
        elements[i].remove();

    ShowBasket();
}

var dialog = document.querySelector('.basket-dialog');
document.querySelector('#basket-show').onclick = function() {
    dialog.show();
};
document.querySelector('#basket-close').onclick = function() {
    dialog.close();
};

function SendCustomerInfo() {    
    var input = document.querySelectorAll(".b-order-input")

    var data = new FormData();
    for (var i = 0; i < input.length; i++) {
        /** @type {HTMLInputElement} */
        var el = input[i];

        var name = el.name;
        var value = el.value;
        
        if (name != "flat" && value == "") {
            alert("Заполните все поля, для нас это важно");
            return;    
        }

        data.append(name, value);
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/server/callus/basket.php', true);

    xhr.send(data);

    document.querySelector(".basket-dialog").style.display = "none";
}