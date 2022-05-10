import React from 'react';
import Taro from "@tarojs/taro";
import { View, ViewProps } from '@tarojs/components';
import { match, P } from 'ts-pattern';
import {mergeProps, withNativeProps} from '../../utils';

export interface FlexItemProps extends ViewProps {
  flex?: number;
  gutter?: number;
  isFirstChild?: boolean;
  isLastChild?: boolean;
}

const classPrefix = 't-flex-item';

const FlexItem: React.FC<FlexItemProps> = (p) => {
  const props = mergeProps({
    flex: 1,
    gutter: 0,
    isFirstChild: false,
    isLastChild: false,
  }, p);

  return withNativeProps(
    props,
    <View
      style={{
        flex: props.flex,
        marginLeft: match(props)
          .with({
            isFirstChild: true
          }, () => 0)
          .with({
            gutter: P.number
          }, ({ gutter }) => Taro.pxTransform(gutter / 2))
          .otherwise(() => 0),
        marginRight: match(props)
          .with({
            isLastChild: true
          }, () => 0)
          .with({
            gutter: P.number
          }, ({ gutter }) => Taro.pxTransform(gutter / 2))
          .otherwise(() => 0),
      }}
      className={classPrefix}>
      {props.children}
    </View>
  )
}

export default FlexItem;
