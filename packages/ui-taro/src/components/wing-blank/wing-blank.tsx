import React from 'react';
import Taro from '@tarojs/taro';
import { mergeProps, withNativeProps } from '../../utils';
import { View, ViewProps } from "@tarojs/components";

export interface WingBlankProps extends ViewProps{
  size: number;
  backgroundColor?: string;
}

export const WingBlank: React.FC<WingBlankProps> = (p) => {
  const props = mergeProps({
    backgroundColor: 'transparent',
  }, p);

  return withNativeProps(
    props,
    <View
      style={{
        padding: `0 ${Taro.pxTransform(props.size)}`,
        backgroundColor: props.backgroundColor,
      }}
    >
      {props.children}
    </View>
  )
};
