import React, { useEffect, useRef } from 'react';

export function useEffectUpdate(effectFunc, deps) {
  const isFirst = useRef(true);
  useEffect(() => {
    if (!isFirst.current) {
      effectFunc();
    }
    isFirst.current = false;
    // prevDeps.current = deps;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
