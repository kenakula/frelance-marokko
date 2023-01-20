import Swiper, { Navigation } from 'swiper';
import { debounce } from '../utils/debounce';

export const initSliders = () => {
  const sliders = document.querySelectorAll('.swiper');

  if (!sliders.length) {
    return;
  }

  const initialize = node => {
    let spaceBetween = node.dataset.spaceBetween ?? 25;
    let breakpoints = node.dataset.breakpoints;
    let destroyBreakpoint = Boolean(node.dataset.breakpoint)
      ? window.matchMedia(`(min-width: ${node.dataset.breakpoint}px)`)
      : null;

    const options = {
      loop: true,
      modules: [Navigation],
      spaceBetween: +spaceBetween,
      observer: true,
      observeParents: true,
      breakpoints: breakpoints ? JSON.parse(breakpoints) : undefined,
      navigation: {
        nextEl: '.swiper-button-next',
      },
    };

    let sliderInst = new Swiper(node, options);

    if (!destroyBreakpoint) {
      return;
    }

    const onWindowResize = () => {
      if (destroyBreakpoint.matches) {
        sliderInst.destroy(true, true);
      } else {
        sliderInst = new Swiper(node, options);
      }
    };

    const resizeWatcher = debounce(onWindowResize, 300);

    window.addEventListener('resize', resizeWatcher);

    if (destroyBreakpoint.matches) {
      sliderInst.destroy(true, true);
    }
  };

  sliders.forEach(slider => initialize(slider));
};
