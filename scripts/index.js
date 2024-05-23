const cardTemplate = document.querySelector('#card-template').content;
const placesCard = document.querySelector('.places__list');

function addCard(title, imageLink, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = title;
    cardElement.querySelector('.card__image').src = imageLink;
    cardElement.querySelector('.card__image').alt = title;

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

    return cardElement;
}

function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}

for (i = 0; i < initialCards.length; i++) {
    const cardElements = addCard(initialCards[i].name, initialCards[i].link, deleteCard);
    placesCard.append(cardElements);
}