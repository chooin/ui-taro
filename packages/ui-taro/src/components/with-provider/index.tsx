import React from 'react';
import { Provider } from '@ebay/nice-modal-react';

interface Props {}

export default function <P extends Props>(
  Component: React.FC<P>,
) {
  return (props: P) => {
    return (
      <Provider>
        <Component {...props} />
      </Provider>
    );
  };
}

