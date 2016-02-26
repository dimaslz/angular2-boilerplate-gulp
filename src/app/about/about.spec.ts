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
import {About} from "./about";

describe('About', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    About
  ]);

  it('should have a String title var with value "About"', inject([ About ], (about) => {
    expect(about.title).toEqual('About');
  }));

});