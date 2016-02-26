var testing_1 = require('angular2/testing');
var home_1 = require("./home");
testing_1.describe('Home', function () {
    testing_1.beforeEachProviders(function () { return [
        home_1.Home
    ]; });
    testing_1.it('should have a String title var with value "Home"', testing_1.inject([home_1.Home], function (home) {
        testing_1.expect(home.title).toEqual('Home');
    }));
});

//# sourceMappingURL=home.spec.js.map
