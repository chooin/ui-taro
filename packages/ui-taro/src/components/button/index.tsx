import * as React from 'react';
import cls from 'classnames';
import { Button, ButtonProps } from '@tarojs/components';
import { mergeProps } from '../../utils';

export interface TButtonProps extends ButtonProps {
  block?: boolean;
  loading?: boolean;
  shape?: 'default' | 'rounded' | 'rectangular';
  fill?: 'solid' | 'outline' | 'none';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

const classPrefix = 't-button'

const Index: React.FC<TButtonProps> = (p) => {
  const props = mergeProps({
    block: false,
    loading: false,
    shape: 'default',
    color: 'default',
    fill: 'none',
  }, p)

  return (
    <Button
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
      loading={false}>{props.children}</Button>
  )
}

export default Index;
