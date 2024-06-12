import '../pages/index.css';
import { initialCards } from '../components/cards.js';
import { addCard, likeCard, deleteCard } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';

const popupImageForm = document.querySelector('.popup_type_image');
const popupEditForm = document.querySelector('.popup_type_edit');
const popupNewForm = document.querySelector('.popup_type_new-card');
const cardContainer = document.querySelector('.places__list');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_url');
const formNewPlace = document.querySelector('.popup__form[name=new-place]');
const formEditProfile = document.querySelector(
    '.popup__form[name=edit-profile]'
);
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

popupEditForm.classList.add('popup_is-animated');
popupNewForm.classList.add('popup_is-animated');
popupImageForm.classList.add('popup_is-animated');

initialCards.forEach(function (item) {
    const cardElements = addCard(item.name, item.link, deleteCard, likeCard, openImage);
    cardContainer.append(cardElements);
});

function openImage(cardTitle, cardLink) {
    openModal(popupImageForm);
    popupCaption.textContent = cardTitle;
    popupImage.src = cardLink;
    popupImage.alt = cardTitle;
}

formNewPlace.addEventListener('submit', function (evt) {
    const cardElements = addCard(
        cardName.value,
        cardLink.value,
        deleteCard,
        likeCard,
        openImage
    );
    cardContainer.prepend(cardElements);
    closeModal(popupNewForm);
    evt.preventDefault();
    evt.target.reset();
});
formEditProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEditForm);
});

document.querySelector('.profile__add-button').addEventListener('click', function () {
    openModal(popupNewForm);
    cardName.focus();
});

document
    .querySelector('.profile__edit-button')
    .addEventListener('click', () => {
        openModal(popupEditForm);
        nameInput.focus();
        nameInput.value = profileName.textContent;
        jobInput.value = profileDescription.textContent;
    });

popupImageForm
    .querySelector('.popup__close')
    .addEventListener('click', function () { closeModal(popupImageForm) });
popupNewForm
    .querySelector('.popup__close')
    .addEventListener('click', function () { closeModal(popupNewForm) });
popupEditForm
    .querySelector('.popup__close')
    .addEventListener('click', function () { closeModal(popupEditForm) });