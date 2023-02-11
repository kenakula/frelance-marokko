import Swiper, { Navigation } from 'swiper';
import { debounce } from '../utils/debounce';

export const initSliders = () => {
  const sliders = document.querySelectorAll('.swiper');

  if (!sliders.length) {
    return;
  }

  const slideChangeCb = swiper => {
    // const activeSlides = swiper.el.querySelectorAll('.swiper-slide-active');

    // if (activeSlides.length) {
    //   activeSlides.forEach(slide => {
    //     slide.classList.add('transitioned');
    //   });
    // }

    const slides = swiper.slides;

    if (slides.length) {
      slides.forEach(slide => {
        if (slide.classList.contains('swiper-slide-active')) {
          slide.classList.add('transitioned');
        } else {
          slide.classList.remove('transitioned');
        }
      });
    }
  };

  const initialize = node => {
    let spaceBetween = node.dataset.spaceBetween ?? 25;
    let slidesPerView = node.dataset.view ?? 1;
    let loop = node.dataset.loop ?? false;
    let breakpoints = node.dataset.breakpoints;
    let destroyBreakpoint = Boolean(node.dataset.breakpoint)
      ? window.matchMedia(`(min-width: ${node.dataset.breakpoint}px)`)
      : null;

    const options = {
      loop: Boolean(loop),
      modules: [Navigation],
      spaceBetween: +spaceBetween,
      slidesPerView,
      breakpoints: breakpoints ? JSON.parse(breakpoints) : undefined,
      navigation: {
        nextEl: '.swiper-button-next',
      },
      on: {
        slideChangeTransitionEnd: slideChangeCb,
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

    if (destroyBreakpoint.matches) {
      sliderInst.destroy(true, true);
    }

    window.addEventListener('resize', resizeWatcher);
  };

  sliders.forEach(slider => initialize(slider));
};
