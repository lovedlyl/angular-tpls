A.
module("phoneList").
component("phoneList", {
    templateUrl: "phone/phone-list/phone-list.template.html",
    controller: ["Phone",
        function(Phone) {
            var self = this;
            self.orderProp = "age";
            self.name = "世界";
            // self.phones = Phone.query();
            self.phones = Phone.query(function(phones) {
                A.forEach(phones, function(phone, i) {
                    phones[i].imageUrl = "phone/img/" + phones[i].imageUrl.slice(11);
                });
            });


        }
    ]

});
