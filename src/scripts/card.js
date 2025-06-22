const cardTemplate = document.querySelector("#card-template").content;

function createCard(newCard, idUser, likeCard) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  const imageTitle = cardElement.querySelector(".card__title");
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const countLikesElement = cardElement.querySelector(".card__like-count");

  cardElement.dataset.cardId = newCard._id;
  cardElement.dataset.ownerId = newCard.owner._id;
  imageElement.src = newCard.link;
  imageElement.alt = newCard.name;
  imageTitle.textContent = newCard.name;
  countLikesElement.textContent = newCard.likes.length;
  
  if (newCard.owner._id !== idUser) {
          buttonDelete.remove();
        }

  const isLiked = newCard.likes.some((like) => like._id === idUser);
  if (isLiked) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  buttonLike.addEventListener("click", (evt) => {
    likeCard(evt, newCard._id);
  });

  return cardElement;
}

export { createCard };
