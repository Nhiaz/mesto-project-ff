export { openModal, closeModal, closeModalByOverlay, closeModalByEscape };

function openModal(modalForm) {
    modalForm.classList.add('popup_is-opened');
    modalForm.addEventListener('click', closeModalByOverlay);
    document.addEventListener('keydown', closeModalByEscape);
}

function closeModal(modalForm) {
    modalForm.classList.remove('popup_is-opened');
    modalForm.removeEventListener('click', closeModalByOverlay);
    document.removeEventListener('keydown', closeModalByEscape);
}

function closeModalByOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        const modalForm = evt.target.closest('.popup');
        closeModal(modalForm);
    }
}

function closeModalByEscape(evt) {
    if (evt.key === 'Escape') {
        const modalForm = document.querySelector('.popup_is-opened');
        closeModal(modalForm);
    }
}
