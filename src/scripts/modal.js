function openModal(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalEsc);
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalEsc);
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_is-opened");
    closeModal(popupOpen);
  }
}

function closeModalOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

export { openModal, closeModal, closeModalOverlay };
