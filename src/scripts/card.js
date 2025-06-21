import { data } from "autoprefixer";
import { putLike, deleteLike } from "./api";
import { openModal } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;
const popupRevision = document.querySelector(".popup_type_revision");

function deleteCard(evt, cardId) {
  openModal(popupRevision);
  popupRevision.dataset.cardId = cardId;
}

function likeCard(evt, cardId) {
  const countLikes = evt.target.parentElement.querySelector(".card__like-count");
  const likeButton = evt.target;

  if (likeButton.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove("card__like-button_is-active");
        countLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLike(cardId)
      .then((updatedCard) => {
        likeButton.classList.add("card__like-button_is-active");
        countLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function createCard(newCard, idUser, likeCard, deleteCard, openImageModal) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
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

  if (newCard.owner._id === idUser) {
    buttonDelete.addEventListener("click", (evt) => {
      deleteCard(evt, newCard._id);
    });
  } else {
    buttonDelete.remove();
  }

  const isLiked = newCard.likes.some((like) => like._id === idUser);
  if (isLiked) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  buttonLike.addEventListener("click", (evt) => {
    likeCard(evt, newCard._id);
  });

  imageElement.addEventListener("click", (evt) => {
    openImageModal(imageElement.src, imageElement.alt, imageTitle.textContent);
  });

  return cardElement;
}

export { deleteCard, likeCard, createCard };
