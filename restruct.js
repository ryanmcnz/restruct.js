(function() {
    // UTF-8 encode/decode routines.
    var decodeUTF8 = function(s) {
        return decodeURIComponent(escape(s));
    };

    var encodeUTF8 = function(s) {
        return unescape(encodeURIComponent(s));
    };

    // 8-bit routines.
    var unsign8 = function(i) {
        return i & 0xff;
    };

    var sign8 = function(i) {
        return (i + 0x80) % 0x100 - 0x80;
    };

    var unpack8 = function(binary) {
        return binary.array[binary.offset++];
    };

    var pack8 = function(val, binary) {
        binary.array[binary.offset++] = val & 0xff;
    };

    // 16-bit routines.
    var unsign16 = function(i) {
        return i & 0xffff;
    };

    var sign16 = function(i) {
        return (i + 0x8000) % 0x10000 - 0x8000;
    };

    var unpack16l = function(binary) {
        var val = binary.array[binary.offset++] & 0xff;
        val |= (binary.array[binary.offset++] & 0xff) << 8;
        return val;
    };

    var pack16l = function(val, binary) {
        binary.array[binary.offset++] = val & 0xff;
        binary.array[binary.offset++] = (val >> 8) & 0xff;
    };

    var unpack16b = function(binary) {
        var val = (binary.array[binary.offset++] & 0xff) << 8;
        val |= binary.array[binary.offset++] & 0xff;
        return val;
    };

    var pack16b = function(val, binary) {
        binary.array[binary.offset++] = (val >> 8) & 0xff;
        binary.array[binary.offset++] = val & 0xff;
    };

    // 32-bit routines.
    var unsign32 = function(i) {
        return i & 0xffffffff;
    };

    var sign32 = function(i) {
        return (i + 0x80000000) % 0x100000000 - 0x80000000;
    };

    var unpack32l = function(binary) {
        var val = binary.array[binary.offset++];
        val |= binary.array[binary.offset++] << 24;
        val |= binary.array[binary.offset++] << 16;
        val |= binary.array[binary.offset++] << 8;
        return val;
    };

    var pack32l = function(val, binary) {
        binary.array[binary.offset++] = val & 0xff;
        binary.array[binary.offset++] = (val >> 8) & 0xff;
        binary.array[binary.offset++] = (val >> 16) & 0xff;
        binary.array[binary.offset++] = (val >> 24) & 0xff;
    };

    var unpack32b = function(binary) {
        var val = binary.array[binary.offset++] << 24;
        val |= binary.array[binary.offset++] << 16;
        val |= binary.array[binary.offset++] << 8;
        val |= binary.array[binary.offset++] & 0xff;
        return val;
    };

    var pack32b = function(val, binary) {
        binary.array[binary.offset++] = (val >> 24) & 0xff;
        binary.array[binary.offset++] = (val >> 16) & 0xff;
        binary.array[binary.offset++] = (val >> 8) & 0xff;
        binary.array[binary.offset++] = val & 0xff;
    };

    // Restruct class.
    var Restruct = function() {
        this.formats = [];
    };

    Restruct.prototype = {
        // Pad NUL byte.
        pad: function() {
            this.formats.push({
                unpack: function(binary, struct) {
                    binary.offset++;
                },

                pack: function(struct, binary) {
                    pack8(0, binary);
                }
            });
            return this;
        },

        // 8-bit character, represented as a single-character string.
        char8: function(k) {
            this.formats.push({
                unpack: function(binary, struct) {
                    struct[k] = String.fromCharCode(unpack8(binary));
                },

                pack: function(struct, binary) {
                    pack8(struct[k].charCodeAt(0), binary);
                }
            });
            return this;
        },

        // 8-bit signed integer.
        int8s: function(k) {
            this.formats.push({
                unpack: function(binary, struct) {
                    struct[k] = sign8(unpack8(binary));
                },

                pack: function(struct, binary) {
                    pack8(struct[k], binary);
                }
            });
            return this;
        },

        // 8-bit unsigned integer.
        int8u: function(k) {
            this.formats.push({
                unpack: function(binary, struct) {
                    struct[k] = unsign8(unpack8(binary));
                },

                pack: function(struct, binary) {
                    pack8(struct[k], binary);
                }
            });
            return this;
        },

        // 16-bit signed little-endian integer.
        int16ls: function(k) {
            this.formats.push({
                unpack: function(binary, struct) {
                    struct[k] = sign16(unpack16l(binary));
                },

                pack: function(struct, binary) {
                    pack16l(struct[k], binary);
                }
            });
            return this;
        },

        // 16-bit signed big-endian integer.
        int16bs: function(k) {
            this.formats.push({
                unpack: function(binary, struct) {
                    struct[k] = sign16(unpack16b(binary));
                },

                pack: function(struct, binary) {
                    pack16b(struct[k], binary);
                }
            });
            return this;
        },

        // 16-bit unsigned little-endian integer.
        int16lu: function(k) {
            this.formats.push({
                unpack: function(binary, struct) {
                    struct[k] = unsign16(unpack16l(binary));
                },

                pack: function(struct, binary) {
                    pack16l(struct[k], binary);
                }
            });
            return this;
        },

        // 16-bit unsigned big-endian integer.
        int16bu: function(k) {
            this.formats.push({
                unpack: function(binary, struct) {
                    struct[k] = unsign16(unpack16b(binary));
                },

                pack: function(struct, binary) {
                    pack16b(struct[k], binary);
                }
            });
            return this;
        },

        // 32-bit signed little-endian integer.
        int32ls: function(k) {
            this.formats.push({
                unpack: function(binary, struct) {
                    struct[k] = sign32(unpack32l(binary));
                },

                pack: function(struct, binary) {
                    pack32l(struct[k], binary);
                }
            });
            return this;
        },

        // 32-bit signed big-endian integer.
        int32bs: function(k) {
            this.formats.push({
                unpack: function(binary, struct) {
                    struct[k] = sign32(unpack32b(binary));
                },

                pack: function(struct, binary) {
                    pack32b(struct[k], binary);
                }
            });
            return this;
        },

        // 32-bit unsigned little-endian integer.
        int32lu: function(k) {
            this.formats.push({
                unpack: function(binary, struct) {
                    struct[k] = unsign32(unpack32l(binary));
                },

                pack: function(struct, binary) {
                    pack32l(struct[k], binary);
                }
            });
            return this;
        },

        // 32-bit unsigned big-endian integer.
        int32bu: function(k) {
            this.formats.push({
                unpack: function(binary, struct) {
                    struct[k] = unsign32(unpack32b(binary));
                },

                pack: function(struct, binary) {
                    pack32b(struct[k], binary);
                }
            });
            return this;
        },

        // Fixed-length string.
        string: function(k, n) {
            this.formats.push({
                unpack: function(binary, struct) {
                    var bytes = [];
                    var eos = false;

                    for(var i = 0; i < n; ++i) {
                        var byte = unpack8(binary);
                        if(byte === 0) eos = true;

                        if(!eos) bytes.push(byte);
                    }

                    struct[k] = decodeUTF8(String.fromCharCode.apply(String, bytes));
                },

                pack: function(struct, binary) {
                    var str = encodeUTF8(struct[k]);
                    var len = Math.min(str.length, n);

                    for(var i = 0; i < len; ++i) {
                        pack8(str.charCodeAt(i), binary);
                    }

                    for(; len < n; ++len) {
                        pack8(0, binary);
                    }
                }
            });
            return this;
        },

        // Unpack an array to a struct.
        unpack: function(array) {
            var binary = {
                offset: 0,
                array: array
            };

            var struct = {};

            for(var i = 0; i < this.formats.length; ++i) {
                this.formats[i].unpack(binary, struct);
            }

            return struct;
        },

        // Pack an array to a struct.
        pack: function(struct, array) {
            if(typeof array === 'undefined') array = [];

            var binary = {
                offset: 0,
                array: array
            };

            for(var i = 0; i < this.formats.length; ++i) {
                this.formats[i].pack(struct, binary);
            }

            return binary.array;
        }
    };

    if(typeof module !== "undefined" && module.exports) {
        module.exports = Restruct;
    }
    if(typeof window !== "undefined") {
        window.Restruct = Restruct;
    }
})();

