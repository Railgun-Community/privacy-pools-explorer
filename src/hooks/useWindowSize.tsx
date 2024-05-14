import { useEffect, useState } from 'react';

export function useWindowSize() {
  const isSSR = typeof window !== 'undefined';
  const [windowSize, setWindowSize] = useState({
    width: isSSR ? 1680 : window.innerWidth,
    height: isSSR ? 1050 : window.innerHeight,
  });

  useEffect(() => {
    if (window.innerWidth && window.innerHeight)
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    window.addEventListener('resize', changeWindowSize);

    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  }, []);

  return windowSize;
}
