/// <reference path="../../../typings/browser.d.ts" />

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
import {Home} from "./home";

describe('Home', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    Home
  ]);

  it('should have a String title var with value "Home"', inject([ Home ], (home) => {
    expect(home.title).toEqual('Home');
  }));

});