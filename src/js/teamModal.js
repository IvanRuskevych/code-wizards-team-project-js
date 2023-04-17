const openTeamBtn = document.querySelector('.js-modal-open');
const closeTeamBtn = document.querySelector('.js-modal-close');
const modalTeam = document.querySelector('.js-modal-team');

openTeamBtn.addEventListener('click', onOpenTeamModal);

function onOpenTeamModal(e) {
  e.preventDefault();
  toggleTeamModal();

  document.addEventListener('keydown', onEscPress);
  document.body.style.overflow = 'hidden';
  closeTeamBtn.addEventListener('click', onCloseTeamModal);
  modalTeam.addEventListener('click', onBackdropClick);
}

function toggleTeamModal() {
  modalTeam.classList.toggle('is-hidden');
}

function onCloseTeamModal() {
  toggleTeamModal();

  closeTeamBtn.removeEventListener('click', onCloseTeamModal);
  document.body.removeAttribute('style');
}

function onBackdropClick(evt) {
  if (evt.currentTarget === evt.target) {
    document.body.removeAttribute('style');
    toggleTeamModal();

    document.removeEventListener('keydown', onEscPress);
    modalTeam.removeEventListener('click', onBackdropClick);
  }
}

function onEscPress(e) {
  const ESK_KEY_CODE = 'Escape';
  const isEskKey = e.code == ESK_KEY_CODE;

  if (isEskKey) {
    toggleTeamModal();

    document.removeEventListener('keydown', onEscPress);

    closeTeamBtn.removeEventListener('click', onCloseTeamModal);
    modalTeam.removeEventListener('click', onBackdropClick);
  }
}
