console.log("\n\nphone-core.service.js");
describe("Phone", function() {
    var data = [{
        "age": 0,
        "id": "motorola-xoom-with-wi-fi",
        "imageUrl": "img/phones/motorola-xoom-with-wi-fi.0.jpg",
        "name": "Motorola XOOM\u2122 with Wi-Fi",
        "snippet": "The Next, Next Generation\r\n\r\nExperience the future with Motorola XOOM with Wi-Fi, the world's first tablet powered by Android 3.0 (Honeycomb)."
    }, {
        "age": 1,
        "id": "motorola-xoom",
        "imageUrl": "img/phones/motorola-xoom.0.jpg",
        "name": "MOTOROLA XOOM\u2122",
        "snippet": "The Next, Next Generation\n\nExperience the future with MOTOROLA XOOM, the world's first tablet powered by Android 3.0 (Honeycomb)."
    }];

    var item = {
        "age": 1,
        "id": "motorola-xoom",
        "imageUrl": "img/phones/motorola-xoom.0.jpg",
        "name": "MOTOROLA XOOM\u2122",
        "snippet": "The Next, Next Generation\n\nExperience the future with MOTOROLA XOOM, the world's first tablet powered by Android 3.0 (Honeycomb)."
    };
    // ...
    var $httpBackend;
    var Phone;
    beforeEach(function() {
        jasmine.addCustomEqualityTester(angular.equals);
    });
    beforeEach(module("phoneCore"));

    beforeEach(inject(function(_$httpBackend_, _Phone_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('phone/data/phones.json')
            .respond(data);
        Phone = _Phone_;
    }));
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    it("完整获取数据", function() {
        var phones = Phone.query();
        expect(phones).toEqual([]);
        $httpBackend.flush();
        expect(phones).toEqual(data);
    });

});
