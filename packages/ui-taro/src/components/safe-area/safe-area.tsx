import React from 'react';
import cls from 'classnames';
import { match } from 'ts-pattern';
import { View, ViewProps } from '@tarojs/components';

export interface SafeAreaProps extends ViewProps {
  position: 'top' | 'bottom'
}

const classPrefix = 't-safe-area';

export const SafeArea: React.FC<SafeAreaProps> = (props) => {
  return match(props)
    .with({
      position: 'top'
    }, () => {
      return <View className={cls(`${classPrefix}-top`,)} />
    })
    .with({
      position: 'bottom',
    }, () => {
      return <View className={cls(`${classPrefix}-bottom`,)} />
    })
    .otherwise(() => <></>);
};
