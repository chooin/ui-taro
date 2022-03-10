import { useState, useEffect } from 'react';
import { getSystemInfoSync } from '@tarojs/taro';

type Result =
  | {
  top: number;
  left: number;
  right: number;
  bottom: number;
}
  | undefined;

export function useSafeArea(): Result {
  const [safeArea, setSafeArea] = useState<Result>();

  useEffect(() => {
    const systemInfo = getSystemInfoSync();

    if (systemInfo.safeArea) {
      setSafeArea({
        top: systemInfo.safeArea.top,
        left: systemInfo.safeArea.left,
        right: systemInfo.safeArea.right,
        bottom: systemInfo.screenHeight - systemInfo.safeArea.bottom,
      });
    }
  }, []);

  return safeArea;
}
