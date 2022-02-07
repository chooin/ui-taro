import React, { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import cls from "classnames";
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useDelayEffect } from '../../hooks';

type Action = {
  text: string;
  key: string;
  onClick: () => void;
}

type Props = {
  extra?: React.ReactNode;
  actions: Action[];
  afterClose?: () => void;
  onClose?: () => void;
  onMaskClick?: () => void;
};

type Result = {}

const classPrefix = 't-action-sheet';

const Modal = NiceModal.create((props: Props): JSX.Element => {
  const modal = useModal();
  const [visible, setVisible] = useState<boolean>(false);

  useDelayEffect(() => {
    setVisible(modal.visible);
  }, [modal.visible]);

  const onClose = async () => {
    await modal.hide();
  }

  return (
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

const show = (props: Props): Promise<Result> => {
  return NiceModal.show(Modal, props) as Promise<Result>;
};

export default {
  show,
};
