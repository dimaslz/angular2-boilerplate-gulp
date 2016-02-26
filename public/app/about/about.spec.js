var testing_1 = require('angular2/testing');
var about_1 = require("./about");
testing_1.describe('About', function () {
    testing_1.beforeEachProviders(function () { return [
        about_1.About
    ]; });
    testing_1.it('should have a String title var with value "About"', testing_1.inject([about_1.About], function (about) {
        testing_1.expect(about.title).toEqual('About');
    }));
});

//# sourceMappingURL=about.spec.js.map
