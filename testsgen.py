#!/usr/bin/env python

import mako.template

BITS = [8, 16, 24, 32, 40, 48]
SAMPLES = {
    8: {
        '_': [0xf2, 0x34],
        'b': [0xf2, 0x34]
    },
    16: {
        '_': [0xf234,
              0xf678],
        'b': [0xf2, 0x34,
              0xf6, 0x78]
    },
    24: {
        '_': [0xf23456,
              0xf890ab],
        'b': [0xf2, 0x34, 0x56,
              0xf8, 0x90, 0xab]
    },
    32: {
        '_': [0xf2345678,
              0xf0abcdef],
        'b': [0xf2, 0x34, 0x56, 0x78,
              0xf0, 0xab, 0xcd, 0xef]
    },
    40: {
        '_': [0xf234567890,
              0xfbcdef1234],
        'b': [0xf2, 0x34, 0x56, 0x78, 0x90,
              0xfb, 0xcd, 0xef, 0x12, 0x34]
    },
    48: {
        '_': [0xf234567890ab,
              0xfbcdef123456],
        'b': [0xf2, 0x34, 0x56, 0x78, 0x90, 0xab,
              0xfb, 0xcd, 0xef, 0x12, 0x34, 0x56]
    }
}


def id(x):
    return x


def sign(bits):
    def _sign(x):
        return (x + 2 ** (bits - 1)) % (2 ** bits) - (2 ** (bits - 1))
    return _sign


def endianize(endian):
    def _endianize(x):
        if endian == 'l':
            return reversed(x)
        return x
    return _endianize


f = open("tests.js", "w")

f.write(mako.template.Template("""(function() {
    var tests = {
% for bits in BITS:
        // int${bits}
% for endianness in "lb":
% for signedness in "su":
        testUnpackInt${bits}${endianness}${signedness}: function(test) {
            test.expect(1);
            var struct = restruct.int${bits}${endianness}${signedness}('test', 2);
            test.deepEqual(struct.unpack([${", ".join(hex(x) for x in endianize(endianness)(SAMPLES[bits]['b']))}]), {test: [${", ".join(hex((signedness == "s" and sign(bits) or id)(x)) for x in SAMPLES[bits]['_'])}]});
            test.done();
        },

        testUnpackOneInt${bits}${endianness}${signedness}: function(test) {
            test.expect(1);
            var struct = restruct.int${bits}${endianness}${signedness}('test');
            test.deepEqual(struct.unpack([${", ".join(hex(x) for x in endianize(endianness)(SAMPLES[bits]['b'][:len(SAMPLES[bits]['b']) // 2]))}]), {test: ${hex((signedness == "s" and sign(bits) or id)(SAMPLES[bits]['_'][0]))}});
            test.done();
        },

        testPackInt${bits}${endianness}${signedness}: function(test) {
            test.expect(1);
            var struct = restruct.int${bits}${endianness}${signedness}('test', 2);
            test.deepEqual(struct.pack({test: [${", ".join(hex(x) for x in SAMPLES[bits]['_'])}]}), [${", ".join(hex(x) for x in endianize(endianness)(SAMPLES[bits]['b']))}]);
            test.done();
        },

        testPackOneInt${bits}${endianness}${signedness}: function(test) {
            test.expect(1);
            var struct = restruct.int${bits}${endianness}${signedness}('test');
            test.deepEqual(struct.pack({test: ${hex(SAMPLES[bits]['_'][0])}}), [${", ".join(hex(x) for x in endianize(endianness)(SAMPLES[bits]['b'][:len(SAMPLES[bits]['b']) // 2]))}]);
            test.done();
        },

% endfor
% endfor
% endfor

        // string
        testPackString: function(test) {
            test.expect(1);
            var struct = restruct.string('test', 10);
            test.deepEqual(struct.pack({test: "hello\\u00ac"}, []), [104, 101, 108, 108, 111, 194, 172, 0, 0, 0]);
            test.done();
        },

        testUnpackString: function(test) {
            test.expect(1);
            var struct = restruct.string('test', 10);
            test.deepEqual(struct.unpack([104, 101, 108, 108, 111, 194, 172, 0, 0, 0]), {test: "hello\\u00ac"});
            test.done();
        },

        // composition
        testPackComposed: function(test) {
            test.expect(2);
            var struct = restruct.string('a', 10).int8ls('b');
            test.strictEqual(struct.size, 11);
            test.deepEqual(struct.pack({a: "hello", b: -1}, []), [104, 101, 108, 108, 111, 0, 0, 0, 0, 0, 255]);
            test.done();
        },

        testUnpackComposed: function(test) {
            test.expect(1);
            var struct = restruct.string('a', 10).int8ls('b');
            test.deepEqual(struct.unpack([104, 101, 108, 108, 111, 0, 0, 0, 0, 0, 255]), {a: "hello", b: -1});
            test.done();
        },

        // typed arrays
        testPackTypedArray: function(test) {
            test.expect(1);

            if(typeof Uint8Array === 'undefined') {
                test.ok(true, "browser does not support typed arrays");
            } else {
                var struct = restruct.string('a', 10).int8ls('b');

                var arr = new Uint8Array(11);
                struct.pack({a: "hello", b: -1}, arr);

                var result = [];
                for(var i = 0; i < 11; ++i) {
                    result.push(arr[i]);
                }

                test.deepEqual(result, [104, 101, 108, 108, 111, 0, 0, 0, 0, 0, 255]);
            }
            test.done();
        },

        testUnpackTypedArray: function(test) {
            test.expect(1);
            if(typeof Uint8Array === 'undefined') {
                test.ok(true, "browser does not support typed arrays");
            } else {
                var struct = restruct.string('a', 10).int8ls('b');
                test.deepEqual(struct.unpack(new Uint8Array([104, 101, 108, 108, 111, 0, 0, 0, 0, 0, 255])), {a: "hello", b: -1});
            }
            test.done();
        }
    };

    var restruct;

    if(typeof module !== "undefined" && module.exports) {
        restruct = require(__dirname + '/restruct.js');
        module.exports = tests;
    }
    if(typeof window !== "undefined") {
        restruct = window.restruct;
        window.tests = tests;
    }
})();""").render(BITS=BITS, SAMPLES=SAMPLES, sign=sign, endianize=endianize, id=id))

f.close()
