import {Lexer} from "./lexer.ts";
import {Parser} from "./parser.ts";

while(true){
	const cmd = prompt("$eye ~ ");

	if(cmd === "run"){
		const lexer: Lexer = new Lexer();
		const parser: Parser = new Parser();

		const tokens = lexer.lex(Deno.readTextFileSync("./main.eye"));

		console.log("Tokens");
		console.log(tokens);
		console.log("\n");

		const res = parser.parse(tokens);

		console.log("Compiled JavaScript");
		console.log(res);
		console.log("\n");

		eval(res);
	} else if(cmd === "clear"){
		console.clear();
	}
}