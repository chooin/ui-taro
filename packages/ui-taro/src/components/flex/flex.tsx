import React from 'react';
import { View, ViewProps } from '@tarojs/components';
import { mergeProps, withNativeProps } from '../../utils';

export interface FlexProps extends ViewProps {
  gutter: number;
}

const classPrefix = 't-flex';

const Flex: React.FC<FlexProps> = (p) => {
  const props = mergeProps({
    gutter: 0,
  }, p);

  const childrenCount = React.Children.count(props.children);

  return withNativeProps(
    props,
    <View className={classPrefix}>
      {React.Children.map(
        props.children,
        (child: React.ReactNode, index) =>
          React.isValidElement(child) &&
          React.cloneElement(child, {
            isFirstChild: index === 0,
            isLastChild: index === childrenCount - 1,
            gutter: props.gutter,
          })
      )}
    </View>
  )
}

export default Flex;
