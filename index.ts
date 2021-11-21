import {Lexer} from "./lexer.ts";
import {Parser} from "./parser.ts";

const lexer: Lexer = new Lexer();
const tokens = lexer.lex(Deno.readTextFileSync("./main.eye"));

const parser: Parser = new Parser();

console.log(tokens);

const ast = parser.parse(tokens);

console.log(ast);

let compiledJS = parser.compile(ast);

console.log(compiledJS);

eval(compiledJS);