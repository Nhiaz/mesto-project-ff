export { deleteCard, likeCard, addCard };
import api from "./api";

function addCard(inputConfig) {

  const config = {
    name: "",
    link: "",
    owner: null,
    _id: null,
    _userId: null,
    deleteCard: () => { },
    likeCard: () => { },
    openImage: () => { },
    likes: [],
    ...inputConfig
  }

  let liked = !!config.likes.filter(e => e._id === config._userId).length
  let owned = config._userId === config.owner?._id

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

  if (!owned)
    deleteCardButton.remove()

  cardCaption.textContent = config.name;
  likeCounter.textContent = config.likes.length;
  cardImage.src = config.link;
  cardImage.alt = `На фотографии изображён: ${config.name}`;

  deleteCardButton.dataset.cardId = config._id
  likeButton.dataset.cardId = config._id

  deleteCardButton.addEventListener('click', config.deleteCard);
  likeButton.addEventListener('click', event => config.likeCard(event, likeCounter));
  cardImage.addEventListener('click', function () {
    config.openImage(config.name, config.link);
  });

  return cardElement;
}

const deleteCard = function (event, likeCounter) {
  api.deleteCard(event.target.dataset.cardId)
    .then(() => event.target.closest('.places__item').remove())
    .catch(err => console.log(err))
};

const likeCard = function (event, likeCounter) {
  const likeButton = event.target.closest('.card__like-button');
  if (likeButton.classList.contains("card__like-button_is-active"))
    api.unlikeCard(likeButton.dataset.cardId)
      .then(() => {
        likeButton.classList.toggle('card__like-button_is-active')
        likeCounter.textContent = Number(likeCounter.textContent) - 1
      })
      .catch(err => console.log(err))
  else
    api.likeCard(likeButton.dataset.cardId)
      .then(() => {
        likeButton.classList.toggle('card__like-button_is-active')
        likeCounter.textContent = Number(likeCounter.textContent) + 1
      })
      .catch(err => console.log(err))
};