<a href="https://github.com/rfw/restruct.js"><img style="position: fixed; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"></a>

# restruct.js

_A JavaScript binary data library._

`restruct.js` performs conversion to and from binary data types. It utilizes an
intuitive declarative API to define formats for binary structure parsers and
emitters. It works in both the browser and on Node.

Example:

    > struct = (new Restruct).
    ... int8u('opcode').
    ... int8u('version').
    ... string('username', 20);

    > struct.pack({opcode: 1, version: 1, username: "test"});
    [ 1, 1, 116, 101, 115, 116, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]

    > struct.unpack(packet);
    { opcode: 1,
      version: 1,
      username: 'test' }

`restruct.js` has support for typed arrays, where avaiable.

## Usage

### Initializing

A `restruct.js` structure can be defined by calling the constructor:

    struct = (new Restruct)

Various data types can then be chained on, such as `int8u`:

    struct.int8u('field_name')

The first parameter to the data type specification function is the field name
for the struct.

See the [data types](#Data-Types) section for all of the data types supported.

### Unpacking

Once a structure has been initialized, the `unpack` method can be used on any
object that supports indexing (both normal and typed arrays):

    struct.unpack([1]);

This will return the parsed structure:

    { field_name: 1 }

### Packing

`restruct.js` also supports packing structures back to series of bytes:

    struct.pack({ field_name: 1 });

This will return an array of bytes:

    [ 1 ]

Optionally, the `struct.pack` function takes a second argument which specifies
an array to use for packing into. This can be a typed array:

    var arr = new Uint8Array(1);
    struct.pack({ field_name: 1 }, arr);

## Data Types

### pad

A `pad` is the null byte, used for empty fields of a struct.

### char8

A `char8` is an 8-bit integer represented as a character.

### int8{s,u}

The `int8s` and `int8u` data types specify signed and unsigned 8-bit integers,
respectively.

### int16{l,b}{s,u}

The `int16` family of data types specify 16-bit integers.

Endianness: `l` specifies little-endian, `b` specifies big-endian.

Signedness: `s` specifies signed, `u` specifies unsigned.

### int32{l,b}{s,u}

The `int32` family of data types specify 32-bit integers.

Endianness: `l` specifies little-endian, `b` specifies big-endian.

Signedness: `s` specifies signed, `u` specifies unsigned.

### string

A `string` is a Unicode string of variable length, specified by the second
argument to the `string(k, n)` function.

During packing, if the given string is shorter than the value of `n`, the
output will be padded with null bytes.

