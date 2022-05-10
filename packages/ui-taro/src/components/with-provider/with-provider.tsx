import React from 'react';
import { Provider } from '@ebay/nice-modal-react';

export function withProvider<P = {}>(
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
