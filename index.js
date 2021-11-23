import {Lexer} from "./lexer.ts";
import {Parser} from "./parser.ts";

while(true){
	const cmd = prompt("$ eye ~");

	switch(cmd){
		case "run":
			const lexer = new Lexer();
			const tokens = lexer.lex(Deno.readTextFileSync("./main.eye"));

			const parser = new Parser();
			const ast = parser.parse(tokens);

			const compiledJS = parser.compile(ast, true);

			if(compiledJS.startsWith("Error:")){
				console.log(compiledJS);
			} else eval(compiledJS);
			break;
		
		case "compile":
			const lexer2 = new Lexer();
			const tokens2 = lexer2.lex(Deno.readTextFileSync("./main.eye"));

			const parser2 = new Parser();
			const ast2 = parser2.parse(tokens2);

			const compiledJS2 = parser2.compile(ast2, true);

			console.log(compiledJS2);
			break;

		case "parse":
			const lexer3 = new Lexer();
			const tokens3 = lexer3.lex(Deno.readTextFileSync("./main.eye"));

			const parser3 = new Parser();
			const ast3 = parser3.parse(tokens3);

			console.log(ast3);
			break;

		case "lex":
			const lexer4 = new Lexer();
			const tokens4 = lexer4.lex(Deno.readTextFileSync("./main.eye"));

			console.log(tokens4);
			break;

		case "clear":
			console.clear();
			break;
	}
}