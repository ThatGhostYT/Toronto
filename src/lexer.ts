import {Token} from "./Token.ts";

class Lexer{
	public lex(code: string){
		let ind = 0;
		let tokens: Token[] = [];

		let operators = ["+", "-", "*", "/", "%"]
		
		let keywords = [
			"var",
			"print",
			"wait",
			"null",
			"func",
			"return",
			"input",
			"mut",
			"async",
			"await",
			// "if",
			// "else",
			// "elif"
		]

		let other: {[key: string]: string} = {
			"(": "LParen",
			")": "RParen",
			"[": "LBracket",
			"]": "RBracket",
			"{": "LCurlyBracket",
			"}": "RCurlyBracket",
			"<": "GreaterThan",
			">": "LessThan",
			".": "Dot",
			",": "Comma",
			"?": "QuestionMark",
			"!": "BangMark"
		}

		for (let i = 0; i < code.length; i++) {
			let char = code[i]

			if (char == "\n" || char == ";") {
				tokens.push(new Token("EOL","EOL"))
			}
			else if (["0","1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(char)) {
				let cur = char;
				while (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(code[i + 1]) && i + 1 < code.length) {
					cur += code[i + 1];
					i++;
				}
				tokens.push(new Token("Number", cur))
			}
			else if (char == '"') {
				let cur = "";
				while (code[i + 1] != '"' && i + 1 < code.length) {
					cur += code[i + 1];
					i++;
				}
				i++;
				tokens.push(new Token("String", "\"" + cur + "\""))
			}
			else if(char == "'"){
				let cur = "";
				while (code[i + 1] != "'" && i + 1 < code.length) {
					cur += code[i + 1];
					i++;
				}
				i++;
				tokens.push(new Token("TemplateString", "\'" + cur + "\'"))
			}
			else if (operators.includes(char)) {
				tokens.push(new Token("Operator", char))
			}
			else if (char.match(/[a-zA-Z]+[0-9]*/g)) {
				let cur = char;
				while (code[i + 1]?.match(/[a-zA-Z]+[0-9]*/g) && i + 1 < code.length) {
					cur += code[i + 1];
					i++;
				}

				if (keywords.includes(cur)) {
					tokens.push(new Token("Keyword", cur))
				} else {
					tokens.push(new Token("Identifier", cur))
				}
			}
			else if (char == "#") {
				let cur = ""
				while (code[i + 1] != "\n" && i + 1 < code.length) {
					cur += code[i + 1];
					i++;
				}
				tokens.push(new Token("Comment", cur))
			}
			else if (char == "=") {
				tokens.push(new Token("Equals", char))
			}
			else if (Object.keys(other).includes(char)) {
				tokens.push(new Token(other[char], char))
			}
		}

		return tokens;
	}
}

export {Lexer};