export { deleteCard, likeCard, addCard };
import api from "./api";

function addCard(title, imageLink, deleteCard, likeCard, openImage, id, likes = 0, liked = false) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true);
  const deleteCardButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const cardImage = cardElement.querySelector('.card__image');
  const cardCaption = cardElement.querySelector('.card__title');

  if (liked)
    likeButton.classList.toggle('card__like-button_is-active');
  cardCaption.textContent = title;
  likeCounter.textContent = likes;
  cardImage.src = imageLink;
  cardImage.alt = `На фотографии изображён: ${title}`;

  deleteCardButton.dataset.cardId = id
  likeButton.dataset.cardId = id

  deleteCardButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', evt => likeCard(evt, likeCounter));
  cardImage.addEventListener('click', function () {
    openImage(title, imageLink);
  });

  return cardElement;
}

const deleteCard = function (evt, lc) {
  api.deleteCard(evt.target.dataset.cardId)
    .then(() => evt.target.closest('.places__item').remove())
    .catch(err => console.log(err))
};

const likeCard = function (evt, lc) {
  const likeButton = evt.target.closest('.card__like-button');
  if (likeButton.classList.contains("card__like-button_is-active"))
    api.unlikeCard(likeButton.dataset.cardId)
      .then(() => {
        likeButton.classList.toggle('card__like-button_is-active')
        lc.textContent = Number(lc.textContent) - 1
      })
      .catch(err => console.log(err))
  else
    api.likeCard(likeButton.dataset.cardId)
      .then(() => {
        likeButton.classList.toggle('card__like-button_is-active')
        lc.textContent = Number(lc.textContent) + 1
      })
      .catch(err => console.log(err))
};