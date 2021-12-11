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
						value: tokens[i].value.slice(1, tokens[i].value.length - 1),
					});
					break;

				case "Keyword":
					let word = tokens[i].value
					
					if(word === "true" || word === "false"){
						program.body.push({
							type: "Boolean",
							value: word
						});
					} else if (word === "var") {
						if(tokens[++i].type === "QuestionMark") word += "?";
						else i--;
						let varname = tokens[++i]
						i++
						i++
						let body = []
						while(i < tokens.length && tokens[i].type !== "EOL"){
							body.push(tokens[i]);
							i++;
						}
						
						program.body.push({
							type: "Keyword",
							value: word,
							body: body,
							varname: varname.value,
						})
					} else if(word === "null"){
						program.body.push({
							type: "Null",
							value: word,
						});
					} else if(word === "func"){
						let funcname = tokens[++i];
						const expressions = [];
						while(i < tokens.length && tokens[i].type !== "LCurlyBracket"){
							expressions.push(tokens[i].value);
							i++;
						}

						const body = [];

						while(i < tokens.length && tokens[i].type !== "RCurlyBracket"){
							body.push(tokens[i]);
							i++;
						}

						program.body.push({
							type: "Keyword",
							value: word,
							expressions: expressions,
							body: body,
							name: funcname
						});
					} else{
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
					}
					break;

				case "Identifier":
					program.body.push({
						type: "Identifier",
						value: tokens[i].value
					});
					break;

				default:
					if(tokens[i].type === "EOL" || tokens[i].type === "Comment") break;
					program.body.push({
						type: tokens[i].type,
						value: tokens[i].value
					});
					break;
			}
		}
		
		return program;
	}

	compile(program: Program, builtins: boolean = true){
		let ret = "";

		if (builtins) ret += `function sleep(e){const t=(new Date).getTime();for(let n=0;n<1e7&&!((new Date).getTime()-t>e);n++);}`;

		compileLoop:
		for(const element of program.body){
			if(element.type === "Keyword"){
				switch(element.value){
					case "print":
						ret += `console.log(${element.expressions.join("")});`
						break;

					case "var":
						if(this.compile(this.parse(element.body), false).includes("null")) throw new Error("Variable is not null safe.");

						ret += `const ${element.varname}=${this.compile(this.parse(element.body), false)};`;
						break;

					case "var?":
						ret += `const ${element.varname}=${this.compile(this.parse(element.body), false)};`;
						break;

					case "wait":
						ret += `sleep(${Number(element.expressions[0]) * 1000});`;
						break;

					case "func":
						ret += `function ${element.expressions.join("")}${this.compile(this.parse(element.body),false)}};`
						break;

					case "return":
						ret += `return ${element.expressions.join("")};`
				}
			} else {
				switch (element.type) {
					case "String":
						ret += `"${element.value}"`;
						break;

					case "Identifier":
						ret += `${element.value}`;
						break;

					case "Null":
						ret += "null";
						break;

					case "LParen":
						ret += "(";
						break;
					
					case "RParen":
						ret += ")";
						break;

					default:
						ret += `${element.value}`;
						break;
				}
			}
		}

		return ret;
	}
}

export {Parser};