import Micromodal from 'micromodal';
import { initTogglers, initVideos } from './modules';
import { initSliders } from './modules/sliders';

document.addEventListener('DOMContentLoaded', () => {
  Micromodal.init({ disableFocus: true, disableScroll: true });
  initTogglers();
  initSliders();
  initVideos();
});
