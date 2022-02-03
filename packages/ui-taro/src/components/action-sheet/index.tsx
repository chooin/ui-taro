import React, { useEffect, useState } from 'react';
import { match } from 'ts-pattern';
import { View } from '@tarojs/components';
import cls from "classnames";
import NiceModal, { useModal } from '@ebay/nice-modal-react';

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

  useEffect(() => {
    setTimeout(() => {
      setVisible(modal.visible);
    })
  }, [modal.visible])

  return (
    <View className={
      cls(
        classPrefix,
        {
          [`${classPrefix}--visible`]: visible,
        }
      )
    }>
      {
        match(visible)
          .with(true, () => {
            return (
              <View className={`${classPrefix}--wrapper`} onClick={() => modal.hide()}>312321</View>
            )
          })
          .otherwise(() => <></>)
      }
    </View>
  );
});

const show = (props: Props): Promise<Result> => {
  return NiceModal.show(Modal, props) as Promise<Result>;
};

export default {
  show,
};
