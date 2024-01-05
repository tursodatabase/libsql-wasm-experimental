# libSQL Wasm

libSQL Wasm packaged as an ES module, forked from
[SQLite Wasm](https://github.com/sqlite/sqlite-wasm) package.

## Releasing

To release a new version of this package, first build the Wasm binaries in the
[libsql](https://github.com/tursodatabase/libsql) repository.

```console
cd libsql-sqlite3
./configure
cd ext/wasm
make dist
```

The build process outputs a file such as `sqlite-wasm-3440000.zip`. You need to
replace the contents of this repository with that. To that, run the following
commands at the top-level directory of this repository:

```console
npm run build
```
