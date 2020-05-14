const DEBOUNCE_INTERVAL = 500; // ms

const debounce = function (cb) {
  let lastTimeout = null;

  return function (...rest) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      cb.apply(null, ...rest);
    }, DEBOUNCE_INTERVAL);
  };
};

export {debounce};
