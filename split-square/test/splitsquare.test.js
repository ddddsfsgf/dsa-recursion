"use strict";

/* Tests for splitsquare.js
 *
 * Joel Burton <joel@joelburton.com>
 *
 */

const {dump, is_valid, simplify, add} = require("../splitsquare");

assert = require('assert');

describe("dump", function () {
    test("should dump ints", function () {
        assert.equal(dump(0), "0");
        assert.equal(dump(1), "1");
    });

    test("should dump arrays", function () {
        assert.equal(dump([0, 1, 0, 1]), "0 1 0 1");
    });

    test("should handle nesting", function () {
        assert.equal(dump([0, 0, 0, [1, 1, [0, 0, 0, 0], 1]]), "0 0 0 1 1 0 0 0 0 1");
    })
});

describe("is_valid", function () {

    test("should allow correct ints", function () {
        assert.ok(is_valid(0));
        assert.ok(is_valid(1));
    });

    test("should reject wrong ints", function () {
        assert.ok(!is_valid(3));
    });

    test("should reject wrong types", function () {
        assert.ok(!is_valid({"hey": "there"}));
        assert.ok(!is_valid("yo"));
        assert.ok(!is_valid("1"));
    });

    test("should disallow wrong-length arrays", function () {
        assert.ok(!is_valid([0, 0, 0, 0, 0]));
    });

    test("should allow good arrays", function () {
        assert.ok(is_valid([0, 0, 0, 0]));
    });

    test("should handle nesting properly", function () {
        assert.ok(is_valid([0, 0, 0, [1, 1, 1, [0, 0, 0, 0]]]));
        assert.ok(!is_valid([0, 0, 0, [1, 1, 1, 1, [0, 0, 0, 0]]]));
    });
});

describe("simplify", function () {

    test("should be a no-op for ints", function () {
        assert.equal(simplify(1), 1);
        assert.equal(simplify(0), 0);
    });

    test("should not simplify non-matching arrays", function () {
        assert.deepEqual(simplify([1, 0, 1, 0]), [1, 0, 1, 0]);
    });

    test("should simplify matching arrays", function () {
        assert.equal(simplify([1, 1, 1, 1]), 1);
    });

    test("should handle nesting", function () {
        assert.equal(simplify([0, 0, 0, [0, 0, 0, [0, 0, 0, 0]]]), 0);
    });
});

describe("add", function () {

    test("should add ints", function () {
        assert.equal(add(0, 0), 0);
        assert.equal(add(1, 1), 1);
        assert.equal(add(1, 0), 1);
        assert.equal(add(0, 1), 1);
    });

    test("should add arrays", function () {
        // note: .toEqual, not .to.equal, since new list has different identity
        assert.deepEqual(add([1, 0, 1, 0], [0, 0, 0, 1]), [1, 0, 1, 1]);
    });

    test("should handle nesting", function () {
        assert.deepEqual(add(0, [1, 0, 1, 0]), [1, 0, 1, 0]);
        assert.deepEqual(add(1, [1, 0, 1, 0]), [1, 1, 1, 1]);
    });
});
