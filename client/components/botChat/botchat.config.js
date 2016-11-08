'use strict';

export function botChatConfig($httpProvider) {
  'ngInject';

  const API_KEY = 'a22f36afddd74b4d8180fdcefa7355ca';

  $httpProvider.defaults.headers.common.Authorization = "Bearer " + API_KEY;
}
