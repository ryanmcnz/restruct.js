(function() {
    var tests = {
        // Pad
        testPadUnpack: function(test) {
            test.expect(1);
            var struct = (new Restruct).pad();
            test.deepEqual(struct.unpack([0]), {});
            test.done();
        },

        testPadPack: function(test) {
            test.expect(1);
            var struct = (new Restruct).pad();
            test.deepEqual(struct.pack({}, []), [0]);
            test.done();
        },

        // int8
        testInt8sUnpack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int8s('test');
            test.deepEqual(struct.unpack([-1]), {test: -1});
            test.done();
        },

        testInt8sPack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int8s('test');
            test.deepEqual(struct.pack({test: -1}, []), [255]);
            test.done();
        },

        testInt8uUnpack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int8u('test');
            test.deepEqual(struct.unpack([-1]), {test: 255});
            test.done();
        },

        testInt8uPack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int8u('test');
            test.deepEqual(struct.pack({test: -1}, []), [255]);
            test.done();
        },

        // int16
        testInt16lsUnpack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int16ls('test');
            test.deepEqual(struct.unpack([0, 255]), {test: -256});
            test.done();
        },

        testInt16lsPack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int16ls('test');
            test.deepEqual(struct.pack({test: -256}, []), [0, 255]);
            test.done();
        },

        testInt16bsUnpack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int16bs('test');
            test.deepEqual(struct.unpack([255, 0]), {test: -256});
            test.done();
        },

        testInt16bsPack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int16bs('test');
            test.deepEqual(struct.pack({test: -256}, []), [255, 0]);
            test.done();
        },

        testInt16luUnpack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int16lu('test');
            test.deepEqual(struct.unpack([1, 0]), {test: 1});
            test.done();
        },

        testInt16luPack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int16lu('test');
            test.deepEqual(struct.pack({test: 1}, []), [1, 0]);
            test.done();
        },

        testInt16buUnpack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int16bu('test');
            test.deepEqual(struct.unpack([0, 1]), {test: 1});
            test.done();
        },

        testInt16buPack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int16bu('test');
            test.deepEqual(struct.pack({test: 1}, []), [0, 1]);
            test.done();
        },

        // int32
        testInt32lsUnpack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int32ls('test');
            test.deepEqual(struct.unpack([0, 255, 255, 255]), {test: -256});
            test.done();
        },

        testInt32lsPack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int32ls('test');
            test.deepEqual(struct.pack({test: -256}, []), [0, 255, 255, 255]);
            test.done();
        },

        testInt32bsUnpack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int32bs('test');
            test.deepEqual(struct.unpack([255, 255, 255, 0]), {test: -256});
            test.done();
        },

        testInt32bsPack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int32bs('test');
            test.deepEqual(struct.pack({test: -256}, []), [255, 255, 255, 0]);
            test.done();
        },

        testInt32luUnpack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int32lu('test');
            test.deepEqual(struct.unpack([1, 0, 0, 0]), {test: 1});
            test.done();
        },

        testInt32luPack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int32lu('test');
            test.deepEqual(struct.pack({test: 1}, []), [1, 0, 0, 0]);
            test.done();
        },

        testInt32buUnpack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int32bu('test');
            test.deepEqual(struct.unpack([0, 0, 0, 1]), {test: 1});
            test.done();
        },

        testInt32buPack: function(test) {
            test.expect(1);
            var struct = (new Restruct).int32bu('test');
            test.deepEqual(struct.pack({test: 1}, []), [0, 0, 0, 1]);
            test.done();
        },

        // float32
        testFloat32lUnpack: function(test) {
            test.expect(1);
            if(typeof Float32Array === 'undefined') {
                test.ok(true, 'browser does not support Float32Array');
            } else {
                var struct = (new Restruct).float32l('test');
                test.deepEqual(struct.unpack([0, 240, 255, 0]), {test: 2.3504147297935876e-38});
            }
            test.done();
        },

        testFloat32lPack: function(test) {
            test.expect(1);
            if(typeof Float32Array === 'undefined') {
                test.ok(true, 'browser does not support Float32Array');
            } else {
                var struct = (new Restruct).float32l('test');
                test.deepEqual(struct.pack({test: 2.3504147297935876e-38}, []), [0, 240, 255, 0]);
            }
            test.done();
        },

        testFloat32bUnpack: function(test) {
            test.expect(1);
            if(typeof Float32Array === 'undefined') {
                test.ok(true, 'browser does not support Float32Array');
            } else {
                var struct = (new Restruct).float32b('test');
                test.deepEqual(struct.unpack([0, 255, 240, 0]), {test: 2.3504147297935876e-38});
            }
            test.done();
        },

        testFloat32bPack: function(test) {
            test.expect(1);
            if(typeof Float32Array === 'undefined') {
                test.ok(true, 'browser does not support Float32Array');
            } else {
                var struct = (new Restruct).float32b('test');
                test.deepEqual(struct.pack({test: 2.3504147297935876e-38}, []), [0, 255, 240, 0]);
            }
            test.done();
        },

        // float64
        testFloat64lUnpack: function(test) {
            test.expect(1);
            if(typeof Float64Array === 'undefined') {
                test.ok(true, 'browser does not support Float32Array');
            } else {
                var struct = (new Restruct).float64l('test');
                test.deepEqual(struct.unpack([0, 240, 255, 240, 255, 240, 255, 0]), {test: 7.277771372690443e-304});
            }
            test.done();
        },

        testFloat64lPack: function(test) {
            test.expect(1);
            if(typeof Float64Array === 'undefined') {
                test.ok(true, 'browser does not support Float32Array');
            } else {
                var struct = (new Restruct).float64l('test');
                test.deepEqual(struct.pack({test: 7.277771372690443e-304}, []), [0, 240, 255, 240, 255, 240, 255, 0]);
            }
            test.done();
        },

        testFloat64bUnpack: function(test) {
            test.expect(1);
            if(typeof Float64Array === 'undefined') {
                test.ok(true, 'browser does not support Float32Array');
            } else {
                var struct = (new Restruct).float64b('test');
                test.deepEqual(struct.unpack([0, 255, 240, 255, 240, 255, 240, 0]), {test: 7.277771372690443e-304});
            }
            test.done();
        },

        testFloat64bPack: function(test) {
            test.expect(1);
            if(typeof Float64Array === 'undefined') {
                test.ok(true, 'browser does not support Float32Array');
            } else {
            var struct = (new Restruct).float64b('test');
                test.deepEqual(struct.pack({test: 7.277771372690443e-304}, []), [0, 255, 240, 255, 240, 255, 240, 0]);
            }
            test.done();
        },

        // string
        testStringPack: function(test) {
            test.expect(1);
            var struct = (new Restruct).string('test', 10);
            test.deepEqual(struct.pack({test: "hello\u00ac"}, []), [104, 101, 108, 108, 111, 194, 172, 0, 0, 0]);
            test.done();
        },

        testStringUnpack: function(test) {
            test.expect(1);
            var struct = (new Restruct).string('test', 10);
            test.deepEqual(struct.unpack([104, 101, 108, 108, 111, 194, 172, 0, 0, 0]), {test: "hello\u00ac"});
            test.done();
        },

        // composition
        testComposedPack: function(test) {
            test.expect(2);
            var struct = (new Restruct).string('a', 10).int8s('b');
            test.strictEqual(struct.size, 11);
            test.deepEqual(struct.pack({a: "hello", b: -1}, []), [104, 101, 108, 108, 111, 0, 0, 0, 0, 0, 255]);
            test.done();
        },

        testComposedUnpack: function(test) {
            test.expect(1);
            var struct = (new Restruct).string('a', 10).int8s('b');
            test.deepEqual(struct.unpack([104, 101, 108, 108, 111, 0, 0, 0, 0, 0, 255]), {a: "hello", b: -1});
            test.done();
        },

        // typed arrays
        testTypedArrayPack: function(test) {
            test.expect(1);

            if(typeof Uint8Array === 'undefined') {
                test.ok(true, "browser does not support typed arrays");
            } else {
                var struct = (new Restruct).string('a', 10).int8s('b');

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

        testTypedArrayUnpack: function(test) {
            test.expect(1);
            if(typeof Uint8Array === 'undefined') {
                test.ok(true, "browser does not support typed arrays");
            } else {
                var struct = (new Restruct).string('a', 10).int8s('b');
                test.deepEqual(struct.unpack(new Uint8Array([104, 101, 108, 108, 111, 0, 0, 0, 0, 0, 255])), {a: "hello", b: -1});
            }
            test.done();
        }
    };

    var Restruct;

    if(typeof module !== "undefined" && module.exports) {
        Restruct = require(__dirname + '/restruct.js');
        module.exports = tests;
    }
    if(typeof window !== "undefined") {
        Restruct = window.Restruct;
        window.tests = tests;
    }
})()

