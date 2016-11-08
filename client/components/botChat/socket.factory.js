'use strict';
/* eslint no-sync: 0 */

import io from 'socket.io-client';

export default ['socketFactory', (socketFactory) => {
  return socketFactory({
    ioSocket: io()
  });
}];
