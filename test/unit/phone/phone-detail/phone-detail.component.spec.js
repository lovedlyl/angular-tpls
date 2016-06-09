console.log("\n\n\nphone-detail.component.spec.js");
describe("phoneDetail", function() {
    // Add a custom equality tester before each test
    beforeEach(function() {
        jasmine.addCustomEqualityTester(angular.equals);
    });
    // beforeEach(module("phoneDetail"));
    beforeEach(module("phoneCore"));
    beforeEach(module("phoneDetail"));

    describe("测试控制器PhoneDetailContorller", function() {
        var $httpBackend, ctrl;
        var fakeData = {
            name: 'phone xyz',
            images: ["12345678910a.jpg", "12345678910b.jpg"]
        };
        var fakeDataTrained = {
            name: 'phone xyz',
            images: ["phone/img/a.jpg", "phone/img/b.jpg"]
        };

        beforeEach(inject(function($componentController, _$httpBackend_, $routeParams) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET("phone/data/xyz.json").respond(fakeData);
            $routeParams.phoneId = "xyz";
            ctrl = $componentController("phoneDetail");

        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("请求后正确获取相应phone数据", function() {
            console.log("phone:", ctrl.phone);
            expect(ctrl.phone).toEqual({});
            $httpBackend.flush();
            expect(ctrl.phone.name).toEqual(fakeData.name);
            expect(ctrl.phone.images.length).toBe(2);
            expect(ctrl.phone).toEqual(fakeDataTrained);
            // // 首否正确获取大图
            expect(ctrl.mainImgUrl).toEqual(fakeDataTrained.images[0]);
        });
    });
    // ..................

});
