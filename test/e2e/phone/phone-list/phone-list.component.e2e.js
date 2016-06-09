console.log("\n\n\nphone-list.component.e2e.js");
describe("phoneList", function() {
    beforeEach(function() {
        browser.get("/#/phones");
    });
    it("根据不同搜索内容，过滤手机个数", function() {
        var phoneList = element.all(by.repeater("phone in $ctrl.phones"));
        var query = element(by.model("$ctrl.query"));

        expect(phoneList.count()).toBe(20);

        query.sendKeys("nexus");
        expect(phoneList.count()).toBe(1);

        query.clear();
        query.sendKeys("motorola");
        expect(phoneList.count()).toBe(8);

        // 测试点击后，链接是否正确
        query.clear();
        query.sendKeys("nexus");
        element.all(by.css(".phones li a")).first().click();
        expect(browser.getLocationAbsUrl()).toBe("/phones/nexus-s");





    });
    // ........
});
