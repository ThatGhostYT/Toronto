import {Token} from "./Token.ts";

interface Program{
	body: {[key: string]: any}[];
}

class Parser{
	parse(tokens: Token[]){
		const program: Program = {
			body: []
		}

		for(let i = 0; i< tokens.length; i++){
			switch(tokens[i].type){
				case "Number":
					if(tokens[i].value.toString().includes(".")){
						program.body.push({
							type: "Float",
							value: tokens[i].value.toString()
						});
					} else{
						program.body.push({
							type: "Integer",
							value: tokens[i].value.toString()
						});
					}
					break;
				
				case "String":
					program.body.push({
						type: "String",
						value: tokens[i].value.slice(1, tokens[i].value.length - 1)
					});
					break;

				case "Operator":
					program.body.push({
						type: "Operator",
						value: tokens[i].value,
						expressions: {
							before: tokens[i - 1].value,
							after: tokens[i + 1].value
						}
					});
					break;

				case "Keyword":
					const word = tokens[i].value
					const expressions = [];
					while(i < tokens.length && tokens[i].type !== "EOL"){
						expressions.push(tokens[i].value);
						i++;
					}

					program.body.push({
						type: "Keyword",
						value: word,
						expressions: expressions.splice(1)
					});
					break;

				case "Identifier":
					program.body.push({
						type: "Identifier",
						value: tokens[i].value
					});
					break;
			}
		}
		
		return program;
	}

	compile(program: Program){
		let ret = "";

		for(const element of program.body){
			if(element.type === "Keyword"){
				switch(element.value){
					case "print":
						ret += `console.log(${element.expressions.join("")});`
						break;

					case "var":
						ret += `let ${element.expressions.join("")};`;
						break;
				}
			}
		}

		return ret;
	}
}

export {Parser};