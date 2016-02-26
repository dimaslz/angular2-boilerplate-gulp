/// <reference path="../typings/browser" />
import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS, HTTP_BINDINGS} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {App} from './app/app';

bootstrap(App, [HTTP_PROVIDERS, HTTP_BINDINGS, ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })])
  .catch(err => console.error(err));