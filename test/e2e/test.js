describe('Protractor Demo App', function() {
    it('should have a title', function() {
        browser.get('https://www.baidu.com/');

        expect(browser.getTitle()).toEqual('百度一下，你就知道');
    });
});
