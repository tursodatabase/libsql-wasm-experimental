import fs from 'fs';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import decompress from 'decompress';

async function getSqliteZipFile() {
  // Finds a filename like "sqlite-wasm-3340100.zip" in the source tree "../libsql/libsql-sqlite3/ext/wasm"
  const dir = '../libsql/libsql-sqlite3/ext/wasm';
  const files = fs.readdirSync(dir);
  const sqliteZipFile = files.find((file) => /sqlite-wasm-\d+\.zip/.test(file));
  if (!sqliteZipFile) {
    throw new Error('Could not find sqlite-wasm zip file');
  }
  const sqliteZipFilePath = `${dir}/${sqliteZipFile}`;
  console.log(`Found sqlite-wasm zip file: ${sqliteZipFilePath}`);
  return sqliteZipFilePath;
}

async function unzipSqliteWasm(sqliteZipFile) {
  const files = await decompress(sqliteZipFile, 'sqlite-wasm', {
    strip: 1,
    filter: (file) =>
      /jswasm/.test(file.path) && /(\.mjs|\.wasm|\.js)$/.test(file.path),
  });
  console.log(
    `Downloaded and unzipped:\n${files
      .map((file) => (/\//.test(file.path) ? '‣ ' + file.path + '\n' : ''))
      .join('')}`,
  );
  fs.rmSync(sqliteZipFile);
}

async function main() {
  const sqliteWasmZipFile = await getSqliteZipFile();
  await unzipSqliteWasm(sqliteWasmZipFile);
  try {
    fs.copyFileSync(
      './node_modules/module-workers-polyfill/module-workers-polyfill.min.js',
      './demo/module-workers-polyfill.min.js',
    );
  } catch (err) {
    console.error(err.name, err.message);
  }
}

main();
