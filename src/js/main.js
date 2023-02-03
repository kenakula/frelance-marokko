import {
  initTogglers,
  initVideos,
  initSliders,
  initScrollButton,
} from './modules';

document.addEventListener('DOMContentLoaded', () => {
  initTogglers();
  initSliders();
  initVideos();
  initScrollButton();
});
