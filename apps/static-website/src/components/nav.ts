import { init, toggle } from './drawer';

const NAV_SELECTOR = '.js-nav';
const NAV_TOGGLE_SELECTOR = '.js-nav-toggle';
const ARIA_EXPANDED = 'aria-expanded';
const NAV_OPENED_CLASS = 'nav--opened';

const nav: HTMLElement = document?.querySelector(NAV_SELECTOR);
const navToggleBtn: HTMLElement = document?.querySelector(NAV_TOGGLE_SELECTOR);

let isOpen = false;

init({
  containerSelector: NAV_SELECTOR,
  toggleSelector: NAV_TOGGLE_SELECTOR,
  mobileQuery: '(min-width: 68.267em)',
  onToggled: (opened) => {
    if (opened) {
      nav.classList.add(NAV_OPENED_CLASS);
    } else {
      nav.classList.remove(NAV_OPENED_CLASS);
    }
  },
});

navToggleBtn.addEventListener('click', () => {
  toggle();

  isOpen = !isOpen;
  navToggleBtn.setAttribute(ARIA_EXPANDED, isOpen.toString());
});
