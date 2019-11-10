// Inspiration from: https://gist.github.com/jslatts/1c5d4d46b6e5b0ac0e917fa3b6f7968f
/**
 * @template SelectorsMap
 * @param {Function} stateSlicer
 * @param {SelectorsMap} selectorsMap
 * @returns {SelectorsMap}
 */
const bindSelectors = (stateSlicer, selectorsMap) =>
  Object.keys(selectorsMap).reduce(
    (acc, selectorName) => ({
      ...acc,
      [selectorName]: (state, ...args) =>
        selectorsMap[selectorName](stateSlicer(state), ...args)
    }),
    {}
  );

export default bindSelectors;
