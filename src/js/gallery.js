import galleryItems from './app.js';
import * as galleryModal from './gallery-modal';

const galleryContainer = document.querySelector('.js-gallery');

//check if browser support lazy loading
if ('loading' in HTMLImageElement.prototype) {
  galleryContainer.innerHTML = generateGalleryMarkup(galleryItems, true);
} else {
  addLazySizesScript();
  galleryContainer.innerHTML = generateGalleryMarkup(galleryItems);
}

addListeners();

function generateGalleryMarkup(items, hasLazySupport = false) {
  return items
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image lazyload"
      loading="lazy"
      ${hasLazySupport ? 'src="' + preview + '"' : ''}
      ${!hasLazySupport ? 'data-src="' + preview + '"' : ''}
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`,
    )
    .join('');
}

function addLazySizesScript() {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  script.integrity =
    'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
  script.crossOrigin = 'anonymous';

  document.body.appendChild(script);
}

function addListeners() {
  galleryContainer.addEventListener('click', onGalleryClick);
  galleryModal.addModalListeners();
}

function onGalleryClick(e) {
  const element = e.target;
  if (!element.classList.contains('gallery__image')) return;
  e.preventDefault();

  const src = element.dataset?.source;
  galleryModal.openModal(src);
}
