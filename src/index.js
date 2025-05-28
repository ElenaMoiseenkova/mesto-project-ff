import "./index.css";
import { initialCards } from "./scripts/cards.js";
import { deleteCard, likeCard, createCard } from "./scripts/card.js";
import { openModal, closeModal, closeModalOverlay } from "./scripts/modal.js";

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
const descriptionProfile = document.querySelector(".profile__description");
const popupButton = document.querySelector(".popup__button");
const formPopupNewCard = document.forms["new-place"];
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputTypeUrl = document.querySelector(".popup__input_type_url");

function openImageModal(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupImageTitle.textContent = data.name;
  openModal(popupTypeImage);
}

function fillFormValues(form, name, description) {
  form.elements.name.value = name;
  form.elements.description.value = description;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  titleProfile.textContent = inputName.value;
  descriptionProfile.textContent = inputJob.value;
  closeModal(popupProfile);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const name = inputCardName.value;
  const link = inputTypeUrl.value;
  const newCard = createCard({ name, link }, deleteCard, openImageModal);
  cardsContainer.prepend(newCard);
  closeModal(popupAddCard);
  formPopupNewCard.reset();
}

initialCards.forEach(function (data) {
  const newCard = createCard(data, deleteCard, openImageModal, createCard);
  cardsContainer.append(newCard);
});

buttonProfEdit.addEventListener("click", function () {
  fillFormValues(
    formPopupProfile,
    titleProfile.textContent,
    descriptionProfile.textContent
  );
  openModal(popupProfile);
});

buttonProfAdd.addEventListener("click", function () {
  openModal(popupAddCard);
});

document.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup__close")) {
    closeModal(evt.target.closest(".popup"));
  }
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

formPopupProfile.addEventListener("submit", handleProfileFormSubmit);

formPopupNewCard.addEventListener("submit", handleNewCardFormSubmit);
