import galleryItems from './app.js';

const modalRef = document.querySelector('.lightbox');
const modalImgRef = modalRef.querySelector('.lightbox__image');
const modalCloseBtn = document.querySelector('[data-action="close-lightbox"]');

let isModalOpen = false;

export function addModalListeners() {
  modalCloseBtn.addEventListener('click', closeModal);
  modalRef.querySelector('.lightbox__overlay').addEventListener('click', closeModal);
  window.addEventListener('keydown', onModalKeydown);
}

function onModalKeydown(event) {
  if (!isModalOpen) return;

  switch (event.code) {
    case 'Escape':
      closeModal();
      break;
    case 'ArrowRight':
      nextGallerySrc();
      break;
    case 'ArrowLeft':
      prevGallerySrc();
      break;
  }
}

function getCurrentGallerySrcIndex() {
  return galleryItems.findIndex(item => item.original === modalImgRef.src);
}

function nextGallerySrc() {
  const nextIndex = getCurrentGallerySrcIndex() + 1;
  if (nextIndex < galleryItems.length) setModalImgSrc(galleryItems[nextIndex].original);
}

function prevGallerySrc() {
  const prevIndex = getCurrentGallerySrcIndex() - 1;
  if (prevIndex >= 0) setModalImgSrc(galleryItems[prevIndex].original);
}

function setModalImgSrc(src) {
  modalImgRef.src = src;
}

export function openModal(src) {
  document.body.classList.add('modal-open');
  modalRef.classList.add('is-open');
  isModalOpen = true;
  setModalImgSrc(src);
}

function closeModal() {
  document.body.classList.remove('modal-open');
  modalRef.classList.remove('is-open');
  isModalOpen = false;
  setModalImgSrc('');
}
