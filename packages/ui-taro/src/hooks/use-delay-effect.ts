import { useEffect, EffectCallback, DependencyList } from 'react';

export function useDelayEffect(
  effect: EffectCallback,
  deps: DependencyList = [],
  delay: number = 100
): void {
  useEffect(() => {
    setTimeout(() => {
      effect()
    }, delay)
  }, deps);
}
