(()=>{"use strict";function e(e,t,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),p=c.querySelector(".card__delete-button"),u=c.querySelector(".card__like-button"),d=c.querySelector(".card__image");return c.querySelector(".card__title").textContent=e,d.src=t,d.alt="На фотографии изображён: ".concat(e),p.addEventListener("click",n),u.addEventListener("click",o),d.addEventListener("click",(function(){r(e,t)})),c}var t=function(e){e.target.closest(".places__item").remove()},n=function(e){e.target.closest(".card__like-button"),likeButton.classList.toggle("card__like-button_is-active")};function o(e){e.classList.add("popup_is-opened"),e.addEventListener("click",c),document.addEventListener("keydown",p)}function r(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",c),document.removeEventListener("keydown",p)}function c(e){e.currentTarget===e.target&&r(e.target.closest(".popup"))}function p(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))}var u=document.querySelector(".popup_type_image"),d=document.querySelector(".popup_type_edit"),a=document.querySelector(".popup_type_new-card"),i=document.querySelector(".places__list"),s=document.querySelector(".popup__input_type_card-name"),l=document.querySelector(".popup__input_type_url"),_=document.querySelector(".popup__form[name=new-place]"),m=document.querySelector(".popup__form[name=edit-profile]"),y=document.querySelector(".popup__input_type_name"),v=document.querySelector(".popup__input_type_description"),f=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),q=document.querySelector(".popup__image"),S=document.querySelector(".popup__caption");function L(e,t){o(u),S.textContent=e,q.src=t,q.alt=e}d.classList.add("popup_is-animated"),a.classList.add("popup_is-animated"),u.classList.add("popup_is-animated"),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(o){var r=e(o.name,o.link,t,n,L);i.append(r)})),_.addEventListener("submit",(function(o){var c=e(s.value,l.value,t,n,L);i.prepend(c),r(a),o.preventDefault(),o.target.reset()})),m.addEventListener("submit",(function(e){e.preventDefault(),f.textContent=y.value,k.textContent=v.value,r(d)})),document.querySelector(".profile__add-button").addEventListener("click",(function(){o(a),s.focus()})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){o(d),y.focus(),y.value=f.textContent,v.value=k.textContent})),u.querySelector(".popup__close").addEventListener("click",(function(){r(u)})),a.querySelector(".popup__close").addEventListener("click",(function(){r(a)})),d.querySelector(".popup__close").addEventListener("click",(function(){r(d)}))})();