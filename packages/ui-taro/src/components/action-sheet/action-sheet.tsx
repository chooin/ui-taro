import React, { useState } from 'react';
import { View } from '@tarojs/components';
import cls from 'classnames';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useDelayEffect } from '../../hooks';
import { withNativeProps } from '../../utils';

type Action = {
  key: string | number;
  text: string;
  onClick?: () => void;
}

type ActionSheetResult = Omit<Action, 'onClick'>;

export type IActionSheetProps = {
  extra?: React.ReactNode;
  actions: Action[];
  onClose?: () => void;
  afterClose?: () => void;
  onMaskClick?: () => void;
};

const classPrefix = 't-action-sheet';

const Modal = NiceModal.create((props: IActionSheetProps): JSX.Element => {
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
    <View
      onClick={onClose}
      className={
        cls(
          classPrefix,
          {
            [`${classPrefix}--visible`]: visible,
          }
        )
      }>
      <View className={`${classPrefix}--wrapper`}>
        <View onClick={onClose}>Cancel</View>
      </View>
    </View>
  );
});

export const show = (props: IActionSheetProps): Promise<ActionSheetResult> => {
  return NiceModal.show<ActionSheetResult>(Modal, {
    ...props,
    keepMounted: true,
  });
};
