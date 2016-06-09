A.
module("phoneDetail").
component("phoneDetail", {
    templateUrl: "phone/phone-detail/phone-detail.template.html",
    controller: ["$routeParams", "Phone",
        function($routeParams, Phone) {
            var self = this;

            self.setImg = function(url) {
                // console.log(url);
                self.mainImgUrl = url;
            };

            self.onDblclick = function(x) {
                console.log(x);
            };

            // self.phone = Phone.get({phoneId: $routeParams.phoneId});
            self.phone = Phone.get({phoneId: $routeParams.phoneId},
                function(phone) {
                    A.forEach(phone.images, function(img, i) {
                        // console.log(img);
                        phone.images[i] = "phone/img/"+ img.slice(11);
                    })
                    self.setImg(phone.images[0]);
                });

        }
    ]
});
