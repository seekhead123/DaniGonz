import Database from 'better-sqlite3';
import { dirname, join } from 'path'
import { fileURLToPath } from 'url';


console.log(">")
console.log(">")
console.log("CONSTRUCTING DB OBJECT")
console.log(">")

const file = fileURLToPath(import.meta.url)
console.log('> current file:', file)
const dir = dirname(file)
console.log('> current dir:', dir)
const db_path = join(dir, "datos.db");

console.log("> db path:", db_path)
console.log(">")
console.log(">")

const db = new Database(db_path);
export default db;
