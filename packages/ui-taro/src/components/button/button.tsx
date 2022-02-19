import * as React from 'react';
import * as TC from '@tarojs/components';
import cls from 'classnames';
import { match } from 'ts-pattern';
import { mergeProps, withNativeProps } from '../../utils';
import type { Color } from '../../typings';

export interface ButtonProps extends TC.ButtonProps {
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  size?: 'mini' | 'default';
  shape?: 'default' | 'rounded' | 'rectangular';
  fill?: 'default' | 'solid' | 'outline';
  color?: Color;
  onClick?: () => void;
}

const classPrefix = 't-button'

export const Button: React.FC<ButtonProps> = (p) => {
  const props = mergeProps({
    block: false,
    loading: false,
    size: 'default',
    shape: 'default',
    color: 'default',
    fill: 'default',
  }, p)

  const onClick = () => {
    if (props.loading || props.disabled) {
      return;
    }

    props.onClick?.();
  }

  return withNativeProps(
    props,
    <TC.Button
      className={
        cls(
          classPrefix,
          `${classPrefix}--normalize`,
          `${classPrefix}--color-${props.color}`,
          `${classPrefix}--size-${props.size}`,
          `${classPrefix}--fill-${props.fill}`,
          `${classPrefix}--shape-${props.shape}`,
          {
            [`${classPrefix}--block`]: props.block,
            [`${classPrefix}--loading`]: props.loading,
            [`${classPrefix}--disabled`]: props.disabled,
          },
        )
      }
      onClick={onClick}
      loading={false}>
      {
        match(props)
          .with({ loading: true }, () => {
            return <TC.View className={`${classPrefix}--hidden`}>{props.children}</TC.View>
          })
          .otherwise(() => {
            return props.children
          })
      }
    </TC.Button>
  )
}
