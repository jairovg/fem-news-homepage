const body = document?.body;
const matchMedia = window?.matchMedia || (() => {});
let drawerContainer;
let drawerToggleBtn;
let isOpen = false;
let onToggled = () => {};

const DRAWER_CLASS = 'drawer';
const DRAWER_OPENED_CLASS = `${DRAWER_CLASS}--opened`;
const DRAWER_BACKDROP_CLASS = `${DRAWER_CLASS}__backdrop`;
const DRAWER_ANIMATE_CLASS = `${DRAWER_CLASS}--animate`;

let drawerBackdrop = document.createElement('div');
drawerBackdrop?.classList?.add(DRAWER_BACKDROP_CLASS);

export const init = ({
  containerSelector,
  toggleSelector,
  mobileQuery,
  onToggled: onToggledFn = () => {},
}) => {
  if (drawerContainer) return false;

  onToggled = onToggledFn;
  drawerContainer = document?.querySelector(containerSelector);

  if (toggleSelector) {
    drawerToggleBtn = document?.querySelector(toggleSelector);
  }

  if (mobileQuery) {
    const mql = matchMedia(mobileQuery);
    const mediaHandler = ({ matches }) => {
      if (matches && isOpen) {
        toggle();
      }
    };

    mql.addListener(mediaHandler);
    mediaHandler(mql);
  }

  drawerContainer?.addEventListener('transitionend', (e) => {
    if (!isOpen) {
      body.removeChild(drawerBackdrop);
      onToggled(isOpen);
      drawerContainer.classList.remove(DRAWER_CLASS);
      drawerContainer.classList.remove(DRAWER_ANIMATE_CLASS);
    }
  });

  return true;
};

export const toggle = () => {
  if (!drawerContainer) return false;

  if (!isOpen) {
    isOpen = true;
    body.appendChild(drawerBackdrop);
    drawerContainer.classList.add(DRAWER_CLASS);
    onToggled(isOpen);

    setTimeout(() => {
      drawerContainer.classList.add(DRAWER_ANIMATE_CLASS);
      drawerContainer.classList.toggle(DRAWER_OPENED_CLASS);
    });
  } else {
    isOpen = false;
    drawerContainer.classList.toggle(DRAWER_OPENED_CLASS);
  }
};
