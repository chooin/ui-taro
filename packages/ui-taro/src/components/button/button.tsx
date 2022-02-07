import * as React from 'react';
import * as Components from '@tarojs/components';
import cls from 'classnames';
import { mergeProps } from '../../utils';

export interface ButtonProps extends Components.ButtonProps {
  block?: boolean;
  loading?: boolean;
  shape?: 'default' | 'rounded' | 'rectangular';
  fill?: 'solid' | 'outline' | 'none';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

const classPrefix = 't-button'

export const Button: React.FC<ButtonProps> = (p) => {
  const props = mergeProps({
    block: false,
    loading: false,
    shape: 'default',
    color: 'default',
    fill: 'none',
  }, p)

  return (
    <Components.Button
      className={
        cls(
          classPrefix,
          `${classPrefix}-normalize`,
          `${classPrefix}--${props.color}`,
          `${classPrefix}--fill-${props.fill}`,
          `${classPrefix}--shape-${props.shape}`,
          {
            [`${classPrefix}--block`]: props.block,
          },
        )
      }
      {...props}
      loading={false}>{props.children}</Components.Button>
  )
}
