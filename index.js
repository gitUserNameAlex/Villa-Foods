let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);

}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(".mySlides");
    let dots = document.querySelectorAll(".dot");

    if(n > slides.length) {
        slideIndex = 1;
    }

    if(n < 1) {
        slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"
    }

    for(i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");

    }

    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className+= " active";
}

//Back-To-Top Button Scripts

(function() {
'use strict';
  
    function trackScroll() {
      let scrolled = window.pageYOffset;
      let coords = document.documentElement.clientHeight;
  
      if (scrolled > coords) {
        goTopBtn.classList.add('back_to_top-show');
      }
      if (scrolled < coords) {
        goTopBtn.classList.remove('back_to_top-show');
      }
    }
  
    function backToTop() {
        let scrollStep = window.pageYOffset / 40;
        if (window.pageYOffset > 0) {
        window.scrollBy(0, -(scrollStep));
        setTimeout(backToTop, 0);
        }
    }
  
    let goTopBtn = document.querySelector('.back_to_top');
  
    window.addEventListener('scroll', trackScroll);
    goTopBtn.addEventListener('click', backToTop);
  })();

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