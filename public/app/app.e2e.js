describe('WebApp', function () {
    describe('index page', function () {
        browser.get('/');
        it('should have 2 menu items', function () {
            var menuItems = element.all(by.css('#navbar ul li'));
            expect(menuItems.count()).toBe(2);
        });
        it('should show the page', function () {
            var completedAmount = element(by.css('h2'));
            expect(completedAmount.getText()).toEqual('home');
        });
        it('click on "About" section and h2 is "about"', function () {
            var aboutLinkMenu = element(by.css('#navbar ul li:nth-child(2)'));
            expect(aboutLinkMenu.getText()).toEqual('About');
            aboutLinkMenu.click();
            var completedAmount = element(by.css('h2'));
            expect(completedAmount.getText()).toEqual('about');
        });
    });
});

//# sourceMappingURL=app.e2e.js.map
