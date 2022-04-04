import { useEffect } from 'react';

export function useMount(fn: () => void): void {
  useEffect(() => {
    fn();
  }, [])
}
