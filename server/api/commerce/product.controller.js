/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/commerce              ->  index
 */

'use strict';

// Gets a list of Things
export default function (io) {

  io.on('connection', socket => {

    socket.on('smalltalk.user', data => {
      setTimeout(() => {
        socket.emit('add:chat:history', 'We are doing some smalltalk..')
      }, 2000);
    });

    socket.on('buy:product', data => {

      // @todo crazy SOAP/REST Call
      setTimeout(() => {
        socket.emit('add:chat:history', 'Buy product event is triggered..')
      }, 2000);

    });
  });

}
