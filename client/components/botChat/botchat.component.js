'use strict';
/* eslint no-sync: 0 */

//import socketIO from 'socket.io-client';
import socketFactory from './socket.factory';
import angular from 'angular';
import { botChatConfig } from './botchat.config';

export class BotChatComponent {

  $http;
  $scope;
  socket;

  baseUrl;
  lang;
  uuid;
  v;

  /**
   * Constructor
   *
   * @ngInject
   */
  constructor($http, $scope, socket): void {
    this.socket = socket;
    this.$http = $http;
    this.$scope = $scope;

    this.lang = 'en';
    this.v = '20161107';
    this.uuid = 'test'; // @todo generate uuid
    this.baseUrl = 'https://api.api.ai/v1/';

    this.$scope.query = '';
    this.$scope.chatHistory = [];
    this.$scope.sendQuery = this.sendQuery;

    this.addMsg('Welcome! How can I help you?');
    this.bindEventListeners();
  }

  /**
   *
   */
  bindEventListeners() : void {
    this.socket.on('add:chat:history', msg => {
      this.addMsg(msg);
    });
  }

  /**
   * Send query to API.AI backend
   */
  sendQuery(): void {

    let controller = this.$ctrl;

    controller.addMsg(this.query, 'Human');

    controller
      .$http
      .post(controller.getAPIUrl('query'), {
        query: this.query,
        sessionId: controller.uuid,
        lang: controller.lang
      })
      .then(response => {

        let msgList = (response.data.result.fulfillment.messages)
          ? response.data.result.fulfillment.messages
          : [response.data.result.fulfillment];

        msgList.forEach(msg => { controller.addMsg(msg.speech); });

        // Trigger server side action
        controller.socket.emit(response.data.result.action, response.data.result.parameters);
      });

    this.query = '';

  }

  /**
   * Prepare API url
   *
   * @param method
   * @returns {string}
   */
  getAPIUrl(method) : String {
    return this.baseUrl + method + '?v=' + this.v;
  }

  /**
   * Add message to chat history
   *
   * @param msg
   * @param user
   */
  addMsg(msg = '', user = 'Bot') : void {
    let lbl = (user === 'Bot') ? 'default' : 'primary';
    this.$scope.chatHistory.push('<span class="label label-' + lbl + '">' + user + '</span> ' + msg);
  }

}

export default angular.module('directives.botchat', [])
  .config(botChatConfig)
  .factory('socket', socketFactory)
  .component('botchat', {
    template: require('./botchat.html'),
    controller: BotChatComponent
  })
  .name;
