/// <reference path="../../typings/browser" />
import {bootstrap} from 'angular2/platform/browser';
import {Component, provide, View, Inject, OnInit, OnDestroy} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, AsyncRoute, RouterLink, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS} from 'angular2/http';
import {Home} from './home/home';
// import {About} from './about/about';
declare var System: any;

@Component({
    selector: 'app',
    templateUrl: './app/app.html',
    directives: [RouterLink, ROUTER_DIRECTIVES]
    // providers: [ROUTER_PROVIDERS],
    // providers: [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]
    // pipes: []
})

@RouteConfig([
  { path: '/home', component: Home, name: 'Home', useAsDefault: true },
  // { path: '/about', component: About, name: 'About' }, // Sync
  new AsyncRoute({
    path: '/about',
    loader: () => System.import('./app/about/about').then(m => m.About),
    name: 'About'
  }),
  { path: '/**', redirectTo: ['Home'] }
])

export class App implements OnInit, OnDestroy {
  public title: string;
  ngOnInit() {}
  
  ngOnDestroy() {}
  
  constructor() {
    this.title = 'App';
  }
}