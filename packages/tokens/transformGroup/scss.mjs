import colorChroma from '../transforms/color-chroma.mjs';
import pxToRem from '../transforms/size-px-to-rem.mjs';

const NAME = 'scss';

export default (StyleDictionary) => {
  const transforms = [...StyleDictionary.transformGroup[NAME]];
  transforms.splice(transforms.indexOf('color/css'), 0, colorChroma.name);
  transforms.splice(transforms.indexOf('size/rem'), 0, pxToRem.name);

  return {
    name: NAME,
    transforms,
  };
};
