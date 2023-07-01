import { throwSizeError } from './_utils.mjs';

const BASE_FONT_SIZE = 16;
const CONFIG_CATEGORY = 'config';
const SIZE_CATEGORY = 'size';
const ITEMS = ['height', 'size', 'space'];
const UNIT = 'rem';

export default {
  name: 'size/pxToRem',
  type: 'value',
  // only transforms that have transitive: true will be applied to tokens
  // that alias/reference other tokens
  transitive: true,
  matcher: (token) =>
    token.attributes.category === SIZE_CATEGORY ||
    (token.attributes.category === CONFIG_CATEGORY &&
      ITEMS.includes(token.attributes.item)),
  transformer(token) {
    const { name, value } = token;

    const floatVal = parseFloat(value);

    if (isNaN(floatVal)) {
      throwSizeError(name, value, UNIT);
    }

    if (floatVal === 0) {
      return '0';
    }

    return `${floatVal / BASE_FONT_SIZE}${UNIT}`;
  },
};
