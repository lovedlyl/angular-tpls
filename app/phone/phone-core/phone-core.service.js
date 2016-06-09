A.
module("phoneCore").
factory("Phone", ["$resource", function($resource) {
    return $resource("phone/data/:phoneId.json", {}, {
        query: {
            method: "GET",
            params: { phoneId: "phones" },
            isArray: true
        }
    })
}]);
