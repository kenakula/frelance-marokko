import { debounce } from '../utils/debounce';

export const initScrollButton = () => {
  const btn = document.querySelector('[data-scroll-button]');

  if (!btn) {
    return;
  }

  const onBtnClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onWindowScroll = debounce(() => {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  }, 100);

  btn.addEventListener('click', onBtnClick);
  window.addEventListener('scroll', onWindowScroll);
};
