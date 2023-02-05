import {
  initTogglers,
  initVideos,
  initSliders,
  initScrollButton,
  initMap,
} from './modules';

document.addEventListener('DOMContentLoaded', () => {
  initTogglers();
  initSliders();
  initVideos();
  initScrollButton();
  initMap();
});
