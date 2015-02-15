describe('Array', function() {

    before(function() {
        console.log("before");
    });

    after(function() {
        console.log("after");
    });

    beforeEach(function() {
        console.log("beforeEach");
    });

    afterEach(function() {
        console.log("afterEach");
    });

    it("should be easy write a test", function(done) {
        console.log("on test");
        done();
    });

    it("should be easy write a test", function() {
        console.log("on test");
    });

    it("should be easy write a test", function() {
        console.log("on test");
    });

});
