import * as React from 'react';
import classNames from "classnames";
import { Button, ButtonProps } from '@tarojs/components';
import { mergeProps } from '../../utils';

export interface TButtonProps extends ButtonProps {
  block: boolean;
  loading: boolean;
  shape: 'default' | 'rounded' | 'rectangular';
  fill: 'solid' | 'outline' | 'none';
}

const classPrefix = `t-button`

const Index: React.FC<TButtonProps> = (p) => {
  const props = mergeProps({
    shape: 'default',
  }, p)

  return (
    <Button
      className={
        classNames(
          classPrefix,
          {
            [`${classPrefix}-block`]: props.block,
          }
        )
      }
      {...props}>{props.children}</Button>
  )
}

export default Index;
