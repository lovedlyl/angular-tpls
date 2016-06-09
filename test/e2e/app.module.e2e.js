console.log("\n\n\napp.module.2e2.js");
describe("pahonecatApp", function() {
    it("页面跳转", function() {
        browser.get("index.html");
        expect(browser.getLocationAbsUrl()).toBe("/phones");
    });
});
