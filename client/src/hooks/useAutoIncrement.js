import { useEffect, useState } from "react";

export const useAutoIncrement = (initialValue = 0, step = 1) => {
  const [count, increment] = useIncrement(initialValue, step);

  useEffect(function () {
    const timer = setInterval(function () {
      increment();
    }, 1000);

    return function () {
      clearInterval(timer);
    };
  }, []);

  return count;
};

export function useIncrement(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = function () {
    setCount((c) => c + step);
  };

  return [count, increment];
}
