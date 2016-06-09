console.log("\n\n\nphone-detail.component.e2e.js");
describe("phoneDetail", function() {
    var mainImage;
    var thumbs;
    beforeEach(function() {
        browser.get("/#/phones/nexus-s");
        mainImage = element(by.css("img.phone"));
        thumbs = element.all(by.css(".thumbs img"));
        console.log(thumbs);
    });
    it("正确使用phoneId值", function() {
        expect(element(by.binding("$ctrl.phone.name")).getText())
            .toBe("Nexus S");
    });
    // ...
    it("大图地址是否正确", function() {
        expect(mainImage.getAttribute("src"))
            .toMatch(/phone\/img\/nexus-s.0.jpg/);
    });

    it("点击缩略图，是否正确显示大图", function() {
        thumbs.get(2).click()
        expect(mainImage.getAttribute("src"))
            .toMatch(/phone\/img\/nexus-s.2.jpg/);
        thumbs.get(0).click()
        expect(mainImage.getAttribute("src"))
            .toMatch(/phone\/img\/nexus-s.0.jpg/);
    })

});
