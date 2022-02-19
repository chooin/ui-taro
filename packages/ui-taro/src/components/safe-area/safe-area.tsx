import React from 'react';
import cls from 'classnames';
import { match, when } from 'ts-pattern';
import { View, ViewProps } from '@tarojs/components';
import { withNativeProps } from "../../utils";

export interface SafeAreaProps extends ViewProps {
  position: 'top' | 'bottom'
}

const classPrefix = 't-safe-area';

enum Position {
  top = 'top',
  bottom = 'bottom',
}

export const SafeArea: React.FC<SafeAreaProps> = (props) => {
  return withNativeProps(
    props,
    match(props)
      .with({
        position: when((position: string) => {
          return position in Position
        })
      }, ({ position }) => {
        return <View className={cls(classPrefix, `${classPrefix}-${position}`,)} />
      })
      .otherwise(() => <></>)
  );
};
