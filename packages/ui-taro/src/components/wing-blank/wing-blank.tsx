import React from 'react';
import Taro from '@tarojs/taro';
import { View, ViewProps } from "@tarojs/components";

export interface WingBlankProps extends ViewProps{
  size: number;
  backgroundColor?: string;
}

export const WingBlank: React.FC<WingBlankProps> = (props) => {
  return (
    <View
      style={{
        padding: `0 ${Taro.pxTransform(props.size)}`,
        backgroundColor: props.backgroundColor ?? 'transparent',
      }}
      {...props}
    >
      {props.children}
    </View>
  );
};
