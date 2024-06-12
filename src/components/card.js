export { deleteCard, likeCard, addCard };

function addCard(title, imageLink, deleteCard, likeCard, openImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true);
  const deleteCardButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardCaption = cardElement.querySelector('.card__title');

  cardCaption.textContent = title;
  cardImage.src = imageLink;
  cardImage.alt = `На фотографии изображён: ${title}`;

  deleteCardButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', function () {
    openImage(title, imageLink);
  });

  return cardElement;
}

const deleteCard = function (evt) {
  evt.target.closest('.places__item').remove();
};

const likeCard = function (evt) {
  const likeButton = evt.target.closest('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
};
