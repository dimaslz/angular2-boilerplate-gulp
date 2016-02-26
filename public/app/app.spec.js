var testing_1 = require('angular2/testing');
var app_1 = require("./app");
testing_1.describe('App', function () {
    testing_1.beforeEachProviders(function () { return [
        app_1.App
    ]; });
    testing_1.it('should have a String title var with value "App"', testing_1.inject([app_1.App], function (app) {
        testing_1.expect(app.title).toEqual('App');
    }));
});

//# sourceMappingURL=app.spec.js.map
