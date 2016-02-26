/// <reference path="../../typings/browser.d.ts" />

import {
  describe,
  expect,
  beforeEach,
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';
import {ElementRef} from "angular2/core";
import {App} from "./app";

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    App
  ]);

  it('should have a String title var with value "App"', inject([ App ], (app) => {
    expect(app.title).toEqual('App');
  }));

});