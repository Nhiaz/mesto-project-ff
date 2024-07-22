import "../pages/index.css";
import { initialCards } from "../components/cards.js";
import {
  addCard,
  likeCard,
  deleteCard,
  openConfirmingModalForDeleteCard,
  changeLikeState
} from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import { clearValidation, enableValidation } from "../components/validation.js"
import api from "../components/api.js";

const popupEditForm = document.querySelector(".popup_type_edit");
const popupNewForm = document.querySelector(".popup_type_new-card");
const popupImageForm = document.querySelector(".popup_type_avatar");
const cardImageUrl = document.querySelector(".popup__input_image")
const cardContainer = document.querySelector(".places__list");
const cardName = document.querySelector(".popup__input_type_card-name");
const cardLink = document.querySelector(".popup__input_type_url");
const formNewPlace = document.querySelector(".popup__form[name=new-place]");
const formEditProfile = document.querySelector(
  ".popup__form[name=edit-profile]"
);
const formAvatarProfile = document.querySelector(
  ".popup__form[name=edit-avatar]"
);
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

popupEditForm.classList.add("popup_is-animated");
popupNewForm.classList.add("popup_is-animated");
popupImageForm.classList.add("popup_is-animated");

function openImage(cardTitle, cardLink) {
  openModal(popupImageForm);
  popupCaption.textContent = cardTitle;
  popupImage.src = cardLink;
  popupImage.alt = cardTitle;
}

Promise.all([api.getInitialCards(), api.getUser()])
  .then(
    ([cards, userInfo]) => {
      profileName.textContent = userInfo.name
      profileDescription.textContent = userInfo.about
      profileImage.style.backgroundImage = `url(${userInfo.avatar})`

      cards.forEach(item => {
        const cardElements = addCard(
          item.name,
          item.link,
          deleteCard,
          likeCard,
          openImage,
          item._id,
          item.likes.length,
          !!item.likes.filter(e => e._id === userInfo._id).length
        );
        cardContainer.append(cardElements);
      })
    }
  ).catch(err => console.log(err))


  popupImageForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const pb = popupImageForm.querySelector(".popup__button")
  pb.textContent = "Сохранение..."


  api.updateUserAvatar(cardImageUrl.value)
  .then(r => {
    profileImage.style.backgroundImage = `url(${r.avatar})`
    pb.textContent = "Сохранить"
  })
  .catch(err => console.log(err))
  
})

formNewPlace.addEventListener("submit", function (evt) {
  const pb = formNewPlace.querySelector(".popup__button")
  pb.textContent = "Сохранение..."

  api.addNewCards(cardName.value, cardLink.value).then(res => {
    const cardElements = addCard(
      cardName.value,
      cardLink.value,
      deleteCard,
      likeCard,
      openImage,
      res._id
    );
    cardContainer.prepend(cardElements);
    closeModal(popupNewForm);
    evt.preventDefault();
    evt.target.reset();
    pb.textContent = "Сохранить"
  })
    .catch(err => console.log(err))

});

formEditProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const pb = formEditProfile.querySelector(".popup__button")
  pb.textContent = "Сохранение..."

  api.updateUser(nameInput.value, jobInput.value)
    .then(r => {
      profileName.textContent = r.name;
      profileDescription.textContent = r.about;

      closeModal(popupEditForm);
      pb.textContent = "Сохранить"
    })
    .catch(err => console.log(err))
});

const handlerAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  const buttonElement = evt.submitter;
  renderLoading(true, buttonElement);

  updateUserAvatar({
    link: modalFormEditAvatar.link.value,
  })
    .then((userInfo) => {
      profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
      closePopup(modalAvatar);
    })
    .catch((err) => {
      console.log('ошибка добавления аватара:', err);
    })
    .finally(() => {
      renderLoading(false, buttonElement);
    });
};

profileImage.addEventListener("click", function () {
  openModal(popupImageForm)
  cardImageUrl.focus(); 
})

document
  .querySelector(".profile__add-button")
  .addEventListener("click", function () {
    openModal(popupNewForm);
    cardName.focus();
    clearValidation(popupNewForm);
  });

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    openModal(popupEditForm);
    nameInput.focus();
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(popupEditForm);
  });

popupImageForm
  .querySelector(".popup__close")
  .addEventListener("click", function () {
    closeModal(popupImageForm);
  });
popupNewForm
  .querySelector(".popup__close")
  .addEventListener("click", function () {
    closeModal(popupNewForm);
  });
popupEditForm
  .querySelector(".popup__close")
  .addEventListener("click", function () {
    closeModal(popupEditForm);
  });




enableValidation()
