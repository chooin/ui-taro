import * as React from 'react';
import * as Components from '@tarojs/components';
import cls from 'classnames';
import { mergeProps } from '../../utils';

export interface ButtonProps extends Components.ButtonProps {
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  size?: 'mini' | 'default';
  shape?: 'default' | 'rounded' | 'rectangular';
  fill?: 'default' | 'solid' | 'outline';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
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

  return (
    <Components.Button
      className={
        cls(
          classPrefix,
          `${classPrefix}--normalize`,
          `${classPrefix}--${props.color}`,
          `${classPrefix}--${props.size}`,
          `${classPrefix}--fill-${props.fill}`,
          `${classPrefix}--shape-${props.shape}`,
          {
            [`${classPrefix}--block`]: props.block,
            [`${classPrefix}--loading`]: props.loading,
            [`${classPrefix}--disabled`]: props.disabled,
          },
        )
      }
      {...props}
      loading={false}>{props.children}</Components.Button>
  )
}
