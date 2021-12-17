import {Lexer} from "./lexer.ts";
import {Parser} from "./parser.ts";

const lexer = new Lexer();
const parser = new Parser();

let past = "";

while(true){
	const cmd = prompt("$eye -");

	if(cmd === "run"){
		const tokens = lexer.lex(Deno.readTextFileSync("./main.tor"));
		
		const ast = parser.parse(tokens);

		const compiled = parser.compile(ast);

		eval(compiled + "main();");

	} else if(cmd === "compile"){
		const tokens = lexer.lex(Deno.readTextFileSync("./main.tor"));
		
		const ast = parser.parse(tokens);

		const compiled = parser.compile(ast);

		console.log(compiled + "main();");

	} else if(cmd === "parse"){
		const tokens = lexer.lex(Deno.readTextFileSync("./main.tor"));
		
		const ast = parser.parse(tokens);

		console.log(ast);

	} else if(cmd === "lex"){
		const tokens = lexer.lex(Deno.readTextFileSync("./main.tor"));
		
		console.log(tokens);

	} else if(cmd === "clear"){
		console.clear();
		past = "";

	} else if(cmd === "cache"){
		console.log(past);

	} else{
		let builtins;

		const tokens = lexer.lex(cmd);
		console.log(tokens);

		const ast = parser.parse(tokens);
		console.log(ast);

		if(past !== ""){
			builtins = false;
		} else{
			builtins = true;
		}

		const compiled = parser.compile(ast,builtins);
		console.log(past + compiled);

		past += compiled

		eval(past);
	}
}