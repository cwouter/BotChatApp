/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app, io) {

  // Insert routes below
  require('./api/commerce/product.controller').default(io);
  // app.use('/api/commerce', require('./api/commerce'));
  // app.use('/socket.io', require('./api/commerce'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
