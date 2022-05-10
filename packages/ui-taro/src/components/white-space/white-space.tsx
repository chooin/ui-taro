import React from 'react';
import Taro from '@tarojs/taro';
import { mergeProps, withNativeProps } from '../../utils';
import { View, ViewProps } from '@tarojs/components';

export interface IWhiteSpaceProps extends ViewProps {
  size: number;
  backgroundColor?: string;
}

export const WhiteSpace: React.FC<IWhiteSpaceProps> = (p) => {
  const props = mergeProps({
    backgroundColor: 'transparent',
  }, p);

  return withNativeProps(
    props,
    <View
      style={{
        height: Taro.pxTransform(props.size),
        backgroundColor: props.backgroundColor,
      }}
    />
  );
};
