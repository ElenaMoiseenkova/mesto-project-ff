const cardTemplate = document.querySelector("#card-template").content;

function deleteCard(evt) {
  const listItem = evt.target.closest(".places__item");
  listItem.remove();
}

function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

function createCard(data, deleteCard, openImageModal, createCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  const imageTitle = cardElement.querySelector(".card__title");
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");

  imageElement.src = data.link;
  imageElement.alt = data.name;

  imageTitle.textContent = data.name;

  buttonDelete.addEventListener("click", deleteCard);

  imageElement.addEventListener("click", function (evt) {
    openImageModal(data);
  });

  buttonLike.addEventListener("click", likeCard);

  return cardElement;
}

export { deleteCard, likeCard, createCard };
