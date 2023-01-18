export const initTogglers = () => {
  // TODO клик за пределы меню
  const togglers = document.querySelectorAll('[data-toggler]');
  let opened = false;
  let scrollLockClass = 'scroll-lock';
  let targetEl: Element;
  let togglerEl: Element;
  let switchableClass: string;

  const onDocumentClick = (e: MouseEvent): void => {
    if (opened) {
      const target = (e.target as HTMLElement).closest('.main-nav');

      if (!target) {
        document.body.classList.remove(scrollLockClass);
        const scrollPos = document.body.getAttribute('data-scroll');
        window.scrollTo({ top: Number(scrollPos) });
        targetEl.classList.remove(switchableClass);
        togglerEl.classList.remove('toggler--close');
        window.removeEventListener('click', onDocumentClick);
      }
    }
  };

  const switchClass = (
    scrollLock: string,
    togglerEl: Element,
    targetEl: Element,
    switchableClass: string,
  ): void => {
    const isActive = targetEl.classList.contains(switchableClass);
    const scrollLockClass = scrollLock && 'scroll-lock';

    if (!isActive) {
      const top = document.documentElement.scrollTop;
      targetEl.classList.add(switchableClass);
      togglerEl.classList.add('toggler--close');
      document.body.setAttribute('data-scroll', top.toString());
      setTimeout(() => {
        document.body.classList.add(scrollLockClass);
        opened = true;
      }, 200);
    } else {
      document.body.classList.remove(scrollLockClass);
      const scrollPos = document.body.getAttribute('data-scroll');
      window.scrollTo({ top: Number(scrollPos) });
      targetEl.classList.remove(switchableClass);
      togglerEl.classList.remove('toggler--close');
      opened = false;
    }
  };

  const initToggler = (e: MouseEvent): void => {
    const target = (e.target as HTMLElement).closest(
      '[data-toggler]',
    ) as HTMLElement;

    if (!target) {
      return;
    }

    const targetId = target.dataset.targetId;
    togglerEl = target;
    targetEl = document.querySelector(`#${targetId}`);
    switchableClass = target.dataset.targetClassToggle;
    const lockScrolling = target.dataset.scrollLock;
    const breakpoint = target.dataset.breakpoint;

    if (!targetEl) {
      return;
    }

    switchClass(lockScrolling, target, targetEl, switchableClass);

    window.addEventListener('click', onDocumentClick);

    if (lockScrolling) {
      window.addEventListener('resize', () => {
        if (window.matchMedia(`(min-width: ${breakpoint ?? 768}px)`).matches) {
          targetEl.classList.remove(switchableClass);
          target.classList.remove('toggler--close');
          document.body.classList.remove('scroll-lock');
        }
      });
    }
  };

  togglers.forEach(toggler => {
    toggler.addEventListener('click', initToggler);
  });
};
