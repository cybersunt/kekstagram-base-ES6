const DEBOUNCE_INTERVAL = 500; // ms

const debounce = function (cb) {
  let lastTimeout = null;

  return function () {
    let parameters = arguments;
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      cb.apply(null, parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

export {debounce};
