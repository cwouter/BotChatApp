'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

require('angular-socket-io');
const ngRoute = require('angular-route');

import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';

import { routeConfig } from './app.config';

import main from './main/main.component';
import constants from './app.constants';
import botchat from '../components/botChat/botchat.component.js';
import util from '../components/util/util.module';

import './app.scss';

angular.module('naratoApp', [
  ngCookies,
  ngResource,
  ngSanitize,
  ngRoute,
  'btford.socket-io',
  uiBootstrap,
  main,
  constants,
  botchat,
  util
]).config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['naratoApp'], { strictDi: true });
  });
