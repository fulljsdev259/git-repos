//custom debounce function
export const debounce = (func, delay) => {
    let timer;
    return (...argu) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(null, argu);
      }, delay);
    };
  };