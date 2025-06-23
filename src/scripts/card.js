const cardTemplate = document.querySelector("#card-template").content;

function checkStatus(buttonLike) {
  if(buttonLike.classList.contains("card__like-button_is-active")) {
    return true;
  }else{
    return false;
  }
}

function changeLike(button, likes) {
  button.classList.toggle("card__like-button_is-active");
  const countLikesElement = button.closest('.card').querySelector('.card__like-count');
  countLikesElement.textContent = likes;
}

function createCard(newCard, idUser, handleLike, openModalDeleteCard, openImageModal) {
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
  } else {
    buttonDelete.addEventListener("click", (evt) => {
      openModalDeleteCard(evt, newCard._id);
    });
  }

  if(newCard.likes.some((like) => like._id === idUser)) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  buttonLike.addEventListener("click", (evt) => {
    handleLike(evt.target, newCard._id);
  });

  imageElement.addEventListener("click", (evt) => {
    openImageModal(imageElement.src, imageElement.alt, imageTitle.textContent);
  });

  return cardElement;
}

export { createCard, checkStatus, changeLike};
