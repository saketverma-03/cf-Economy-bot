import { Database } from 'bun:sqlite';

const db = new Database('mydb.sqlite');

/**
 * User table guildId(indexed) userId guild+userId(Primery key) total money
 * optomise later tada
 *
 * **/

console.log(db.query(`insert into employees (name) values (?1)`).run('diska'));
// console.log(query.run()); // => { message: "Hello world" }
