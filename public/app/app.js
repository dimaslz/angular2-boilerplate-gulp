var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var home_1 = require('./home/home');
var App = (function () {
    function App() {
        this.title = 'App';
    }
    App.prototype.ngOnInit = function () { };
    App.prototype.ngOnDestroy = function () { };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: './app/app.html',
            directives: [router_1.RouterLink, router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/home', component: home_1.Home, name: 'Home', useAsDefault: true },
            new router_1.AsyncRoute({
                path: '/about',
                loader: function () { return System.import('./app/about/about').then(function (m) { return m.About; }); },
                name: 'About'
            }),
            { path: '/**', redirectTo: ['Home'] }
        ]), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
})();
exports.App = App;

//# sourceMappingURL=app.js.map
