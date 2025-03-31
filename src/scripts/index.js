
const cardContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function deleteCard(event) {
  const listItem = event.target.closest ('.places__item');
listItem.remove();
  };

initialCards.forEach (function addCard(item) {
const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
const imageElement = cardElement.querySelector('.card__image');

imageElement.src = item.link;
imageElement.alt = item.name;

cardElement.querySelector('.card__title').textContent = item.name;
const buttonDelete = cardElement.querySelector('.card__delete-button');
buttonDelete.addEventListener('click', deleteCard);

cardContainer.append(cardElement);
});

