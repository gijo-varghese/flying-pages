// Throttles the exection of a function, aka rate limiter for function calls
// Use `toAdd` to push elements, and when done, call `isDone`
// Source: https://github.com/lukeed/throttles/blob/master/src/single.js

const limitExecution = limit => {
  limit = limit || 1;
  const queue = [],
    wip = 0;
  const toAdd = fn => {
    queue.push(fn) > 1 || run();
  };
  const isDone = () => {
    wip--;
    run();
  };
  const run = () => {
    if (wip < limit && queue.length > 0) {
      queue.shift()();
      wip++;
    }
  };
  return [toAdd, isDone];
};

export default limitExecution;
