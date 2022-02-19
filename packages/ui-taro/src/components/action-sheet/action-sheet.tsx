import React, { useState } from 'react';
import * as TC from '@tarojs/components';
import cls from 'classnames';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useDelayEffect } from '../../hooks';
import { withNativeProps } from '../../utils';

type Action = {
  key: string | number;
  text: string;
  onClick?: () => void;
}

export type ActionSheetProps = {
  extra?: React.ReactNode;
  actions: Action[];
  onClose?: () => void;
  afterClose?: () => void;
  onMaskClick?: () => void;
};

type ActionSheetResult = Required<Action>;

const classPrefix = 't-action-sheet';

const Modal = NiceModal.create((props: ActionSheetProps): JSX.Element => {
  const modal = useModal();
  const [visible, setVisible] = useState<boolean>(false);

  useDelayEffect(() => {
    setVisible(modal.visible);
  }, [modal.visible]);

  const onClose = async () => {
    await modal.hide();
  }

  return withNativeProps(
    {},
    <TC.View
      onClick={onClose}
      className={
        cls(
          classPrefix,
          {
            [`${classPrefix}--visible`]: visible,
          }
        )
      }>
      <TC.View className={`${classPrefix}--wrapper`}>
        <TC.View onClick={onClose}>Cancel</TC.View>
      </TC.View>
    </TC.View>
  );
});

export const show = (props: ActionSheetProps): Promise<ActionSheetResult> => {
  return NiceModal.show(Modal, {
    ...props,
    keepMounted: true,
  }) as Promise<ActionSheetResult>;
};
