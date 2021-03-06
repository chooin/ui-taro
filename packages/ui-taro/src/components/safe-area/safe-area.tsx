import React from 'react';
import Taro from '@tarojs/taro';
import { match, P } from 'ts-pattern';
import { View, ViewProps } from '@tarojs/components';
import { useSafeArea } from '../../hooks';
import { withNativeProps, mergeProps } from "../../utils";

export interface ISafeAreaProps extends ViewProps {
  position: 'top' | 'bottom'
  min?: number;
}

enum Position {
  top = 'top',
  bottom = 'bottom',
}

export const SafeArea: React.FC<ISafeAreaProps> = (p) => {
  const props = mergeProps({
    min: 0
  }, p)
  const safeArea = useSafeArea();

  return withNativeProps(
    props,
    match(props)
      .with({
        position: P.when((position: string) => {
          return position in Position
        })
      }, () => {
        return (
          <View
            style={{
              height: Taro.pxTransform(
                Math.max(props.min, safeArea?.bottom ? safeArea.bottom * 2 : 0),
              ),
            }}
          />
        )
      })
      .otherwise(() => <></>)
  );
};
