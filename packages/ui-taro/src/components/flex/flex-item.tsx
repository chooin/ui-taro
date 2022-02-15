import React from 'react';
import { View, ViewProps } from '@tarojs/components';
import { match, __ } from 'ts-pattern';
import cls from 'classnames';
import { mergeProps } from '../../utils';

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

  return (
    <View
      {...props}
      style={{
        flex: props.flex,
        marginLeft: match(props)
          .with({
            isFirstChild: true
          }, () => 0)
          .with({
            gutter: __.number
          }, ({ gutter }) => gutter)
          .otherwise(() => 0),
        marginRight: match(props)
          .with({
            isLastChild: true
          }, () => 0)
          .with({
            gutter: __.number
          }, ({ gutter }) => gutter)
          .otherwise(() => 0),
      }}
      className={cls(props.className, classPrefix)}>
      {props.children}
    </View>
  )
}

export default FlexItem;
