import { useEffect, useRef } from 'react';

const useOnce = (callback) => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      callback();
      hasRun.current = true;
    }
  }, [callback]);
};

export default useOnce;
