const cardsContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function deleteCard(event) {
  const listItem = event.target.closest(".places__item");
  listItem.remove();
}

function createCard(data, deleteCard) {
  cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");

  imageElement.src = data.link;
  imageElement.alt = data.name;

  cardElement.querySelector(".card__title").textContent = data.name;

  const buttonDelete = cardElement.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", deleteCard);

  return cardElement;
}

initialCards.forEach(function (data) {
  const newCard = createCard(data, deleteCard);
  cardsContainer.append(newCard);
});
