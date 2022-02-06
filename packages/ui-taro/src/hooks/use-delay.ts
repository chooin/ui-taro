import { useEffect, EffectCallback, DependencyList } from 'react';

function useDelay(effect: EffectCallback, deps: DependencyList = [], delay: number = 100): void {
  useEffect(() => {
    setTimeout(() => {
      effect()
    }, delay)
  }, deps);
};

export default useDelay;
