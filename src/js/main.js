import Micromodal from 'micromodal';
import { initTogglers, initVideos, initSliders } from './modules';

document.addEventListener('DOMContentLoaded', () => {
  Micromodal.init({ disableFocus: true, disableScroll: true });
  initTogglers();
  initSliders();
  initVideos();
});
