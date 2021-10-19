// Throttle functions calls
// Source: https://stackoverflow.com/questions/27078285/simple-throttle-in-js

const throttle = (callback, limit) => {
  var wait = false;
  return function () {
    if (!wait) {
      callback.apply(null, arguments);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
};

export default throttle;
