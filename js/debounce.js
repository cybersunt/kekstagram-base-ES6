const DEBOUNCE_INTERVAL = 500; // ms

const debounce = function (cb) {
  let lastTimeout = null;

  return function (...parameters) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

export {debounce};
