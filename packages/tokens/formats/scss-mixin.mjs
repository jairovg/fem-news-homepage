/**
 * Get the mixin name based on the ditionary's name property
 * @param {Object} props - Dictionary object
 * @param {String} props.name - Token name
 */
const mixinName = (props) =>
  props.name.substring(0, props.name.lastIndexOf('-'));

export default {
  name: 'scss/mixin',
  formatter({ dictionary }) {
    const mixinTokens = dictionary.allTokens.filter((p) => p.mixin);
    const mixinNames = [...new Set(mixinTokens.map(mixinName))];

    return mixinNames
      .map((m) => {
        const properties = mixinTokens
          .filter((token) => m === mixinName(token))
          .map((token) => `${token.property}: ${token.value};`);

        return `@mixin ${m}() {
  ${properties.join('\n  ')}
}
%${m} {
  ${properties.join('\n  ')}
}`;
      })
      .join('\n\n');
  },
};
