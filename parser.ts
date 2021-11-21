import {Token} from "./Token.ts";

const keywords = [
	"var"
];

class Parser{
	parse(tokens: Token[]){
		let ret: string = "";

		for(let i = 0; i < tokens.length; i++){
			const token = tokens[i];

			if(token.type === "Comment"){
				ret += `\/\/${token.value}`;
				continue;
			}

			if(token.type === "EOL"){
				ret += "\n";
				continue;
			}

			if(token.type === "String"){
				ret += token.value;
				continue;
			}

			if(token.type === "Number"){
				const operator = tokens[++i];

				if(operator.type === "Operator"){
					const num = tokens[++i];

					if(num.type === "Number"){
						switch(operator.value){
							case "+":
								ret += token.value + num.value;
								break;
							case "-":
								ret += token.value - num.value;
								break;
							case "*":
								ret += token.value * num.value;
								break;
							case "/":
								ret += token.value / num.value;
								break;
							case "%":
								ret += token.value % num.value;
								break;
						}
					}
				}
				continue;
			}

			if(token.type === "Keyword"){
				if(token.value === "var"){
					const var_name = tokens[++i];

					if(var_name.type === "Identifier"){
						const equals = tokens[++i];

						if(equals.type !== "Equals"){
							ret = `Variable operator must be =`;
							break;
						}

						const var_val = tokens[++i];

						ret += `let ${var_name.value} = ${var_val.value};`;
					} else if(var_name.type === "Keyword"){
						ret = `${var_name.value} is a keyword and cannot be overwritten.`;
					}
				} else if(token.value === "print"){
					const print = tokens[++i];
					ret += `console.log(${print.value});`;
				}
				continue;
			}
		}
		
		return ret;
	}
}

export {Parser};