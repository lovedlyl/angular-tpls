 describe("A suit", function() {
     it("contains spec with an expectioon", function() {
         expect(true).toEqual(true);
     });
 });

 describe("reverse", function() {
     it("reverse a string", function() {
     		expect("dcba").toEqual(reverseStr("abcd"));
     		expect("damo").toEqual(reverseStr("omad"));
     });
 });
