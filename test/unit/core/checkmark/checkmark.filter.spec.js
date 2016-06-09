console.log("\n\n\ncheckmark.filter.spec.js");

describe("checkmark过滤器", function() {
	beforeEach(module("core"));
	it("测试勾勾和叉叉过滤是否成功", inject(function(checkmarkFilter) {
		expect(checkmarkFilter(true)).toBe("\u2713");
		expect(checkmarkFilter(false)).toBe("\u2718");
	}));

});