const distanceToElem = (elem, x, y) =>
  Math.floor(
    Math.sqrt(
      Math.pow(x - (elem.offsetLeft + elem.offsetWidth / 2), 2) +
        Math.pow(y - (elem.offsetTop + elem.offsetHeight / 2), 2)
    )
  );

export default distanceToElem;
