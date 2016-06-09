console.log("\n\n\nphone-list.component.spec.js");
describe("phoneList", function() {
    // 初始化模块
    beforeEach(module("phoneList"));
    beforeEach(module("phoneCore"));
    beforeEach(function() {
        jasmine.addCustomEqualityTester(angular.equals);
    });


    var ctrl;
    var $httpBackend;
    var fakeData = [{ name: 'Nexus S', imageUrl: "12345678910a.jpg" },
        { name: 'Motorola DROID', imageUrl: "12345678910b.jpg" }
    ];
    var fakeDataTrained = [{ name: 'Nexus S', imageUrl: "phone/img/a.jpg" },
        { name: 'Motorola DROID', imageUrl: "phone/img/b.jpg" }
    ];
    describe("PhoneListController", function() {

        beforeEach(inject(function($componentController, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('phone/data/phones.json')
                .respond(fakeData);

            ctrl = $componentController('phoneList');
        }));

        afterEach(function() {
            // $httpBackend.flush();
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("请求数据", function() {
            console.log("phones:", ctrl.phones);
            expect(ctrl.phones).toEqual([]);
            $httpBackend.flush();
            // $httpBackend.flush();
            console.log(ctrl.phones[0]);
            expect(ctrl.phones).toEqual(fakeDataTrained);
            expect(ctrl.name).toBe("世界");

        });

        // ...........
        it("默认排序方式为age", function() {
            expect(ctrl.orderProp).toBe("age");
        });
        // .........
    });
    // .......
});
