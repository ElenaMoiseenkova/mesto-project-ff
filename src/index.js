import "./index.css";
import { createCard} from "./scripts/card.js";
import { openModal, closeModal, closeModalOverlay } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  getUserInfoCards,
  patchUserInfo,
  addNewCard,
  putLike,
  deleteLike,
  deleteCardApi,
  updateAvatar,
} from "./scripts/api.js";

const cardsContainer = document.querySelector(".places__list");
const buttonProfEdit = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_edit");
const buttonProfAdd = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__caption");
const formPopupProfile = document.forms["edit-profile"];
const inputName = document.querySelector(".popup__input_type_name");
const inputJob = document.querySelector(".popup__input_type_description");
const titleProfile = document.querySelector(".profile__title");
const imageProfile = document.querySelector(".profile__image");
const descriptionProfile = document.querySelector(".profile__description");
const popupButton = document.querySelector(".popup__button");
const formPopupNewCard = document.forms["new-place"];
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputTypeUrl = document.querySelector(".popup__input_type_url");
const popupRevision = document.querySelector(".popup_type_revision");
const buttonPopupRevision = popupRevision.querySelector(".popup__button");
const popupAvatar = document.querySelector(".popup_type_avatar");
const formPopupAvatar = document.forms["add-avatar"];
const editAvatar = document.querySelector(".profile__image_avatar");
const buttonsClose = document.querySelectorAll(".popup__close");
let idUser;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function changeButton(button, loading) {
  if (loading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

function fillProfileEdit(user) {
  titleProfile.textContent = user.name;
  descriptionProfile.textContent = user.about;
  imageProfile.style.backgroundImage = `url(${user.avatar})`;
}

function openImageModal(imageElementUrl, imageElementAlt, title) {
  popupImage.src = imageElementUrl;
  popupImage.alt = imageElementAlt;
  popupImageTitle.textContent = title;
  openModal(popupTypeImage);
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

function openModalDeleteCard(evt, cardId) {
  openModal(popupRevision);
  popupRevision.dataset.cardId = cardId;
}

function fillFormValues(form, name, description) {
  form.elements.name.value = name;
  form.elements.description.value = description;
}

    const getNewCards = (initialCards, idUser) => {
      initialCards.forEach((newCard) => {
        const newCardId = newCard._id;
        const createdCard = createCard(newCard, idUser, likeCard);
        cardsContainer.append(createdCard);
        const buttonDelete = createdCard.querySelector(".card__delete-button");
        const imageCard = createdCard.querySelector(".card__image");

        if(buttonDelete != null) {
        buttonDelete.addEventListener("click", (evt) => {
          openModalDeleteCard(evt, newCardId);
        });
      }
      
        imageCard.addEventListener("click", function (evt) {
          openImageModal(imageCard.src, imageCard.alt, imageCard.textContent);
        });
      });
    };

function handlePopupRevisionDelete(evt) {
  deleteCardApi(popupRevision.dataset.cardId)
    .then((res) => {
      const card = document.querySelector(
        `[data-card-id="${popupRevision.dataset.cardId}"]`
      );
      card.remove();
      closeModal(popupRevision);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  changeButton(formPopupProfile.querySelector(".popup__button"), true);
  patchUserInfo({
    name: formPopupProfile.name.value,
    about: formPopupProfile.description.value,
  })
    .then((newProfile) => {
      fillProfileEdit(newProfile);
      closeModal(popupProfile);
      clearValidation(formPopupProfile, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeButton(formPopupProfile.querySelector(".popup__button"), false);
    });
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  changeButton(formPopupNewCard.querySelector(".popup__button"), true);
  const name = inputCardName.value;
  const link = inputTypeUrl.value;
  addNewCard({ name, link })
    .then((addedCard) => {
      const addedCardId = addedCard._id;
      const currentCard = createCard(addedCard, idUser, likeCard);
       cardsContainer.prepend(currentCard);
       const buttonDelete = currentCard.querySelector(".card__delete-button");
        const imageCard = currentCard.querySelector(".card__image");

        buttonDelete.addEventListener("click", (evt) => {
          openModalDeleteCard(evt, addedCardId);
        });

        imageCard.addEventListener("click", function (evt) {
          openImageModal(imageCard.src, imageCard.alt, imageCard.textContent);
        });
      
      closeModal(popupAddCard);
      formPopupNewCard.reset();
      clearValidation(formPopupNewCard, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeButton(formPopupNewCard.querySelector(".popup__button"), false);
    });
}

function handleAddAvatarFormSubmit(evt) {
  evt.preventDefault();
  changeButton(formPopupAvatar.querySelector(".popup__button"), true);
  updateAvatar(formPopupAvatar.link.value)
    .then((addedProfile) => {
      fillProfileEdit(addedProfile);
      closeModal(popupAvatar);
      clearValidation(formPopupAvatar, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeButton(formPopupAvatar.querySelector(".popup__button"), false);
    });
}

buttonProfEdit.addEventListener("click", function () {
  clearValidation(formPopupProfile, validationConfig);
  fillFormValues(
    formPopupProfile,
    titleProfile.textContent,
    descriptionProfile.textContent
  );
  openModal(popupProfile);
});

buttonProfAdd.addEventListener("click", function () {
  formPopupNewCard.reset();
  clearValidation(formPopupNewCard, validationConfig);
  openModal(popupAddCard);
});

buttonsClose.forEach((button) => {
  button.addEventListener('click', function (evt) {
    closeModal(evt.target.closest(".popup"));
  })
})

editAvatar.addEventListener("click", function (evt) {
  formPopupAvatar.reset();
  clearValidation(formPopupAvatar, validationConfig);
  openModal(popupAvatar);
});

popupProfile.addEventListener("click", function (evt) {
  closeModalOverlay(evt);
});

popupAddCard.addEventListener("click", function (evt) {
  closeModalOverlay(evt);
});

popupTypeImage.addEventListener("click", function (evt) {
  closeModalOverlay(evt);
});

popupRevision.addEventListener("click", function (evt) {
  closeModalOverlay(evt);
});

popupAvatar.addEventListener("click", function (evt) {
  closeModalOverlay(evt);
});

buttonPopupRevision.addEventListener("click", handlePopupRevisionDelete);

formPopupProfile.addEventListener("submit", handleProfileFormSubmit);

formPopupNewCard.addEventListener("submit", handleNewCardFormSubmit);

formPopupAvatar.addEventListener("submit", handleAddAvatarFormSubmit);

getUserInfoCards()
  .then((res) => {
    const user = res[0];
    idUser = user._id;
    const initialCards = res[1];
    fillProfileEdit(user);
    getNewCards(initialCards, idUser);
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationConfig);
