import {Token} from "./Token.ts";

interface Program{
	body: {[key: string]: any}[];
}

const functionNames: any[] = ["toInt"];

class Parser{
	parse(tokens: Token[]){
		const program: Program = {
			body: []
		}

		for(let i = 0; i < tokens.length; i++){
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
						value: tokens[i].value
					});
					break;

				case "Keyword":
					let word = tokens[i].value
					
					if(word === "true" || word === "false"){
						program.body.push({
							type: "Boolean",
							value: word
						});
					} else if (word === "var" || word === "mut") {
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
						functionNames.push(funcname.value);
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
							expressions.push(tokens[i]);
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
					if(tokens[i+1] && tokens[i].value === "("){
						i--;
						if(!functionNames.includes(tokens[i].value)){
							if(tokens[i].value === "main") throw new Error("No main function found!");
							else throw new Error(`Unknown function ${tokens[i].value}.`);
						}
					}

					program.body.push({
						type: "Identifier",
						value: tokens[i].value
					});
					break;

				default:
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

		if (builtins) ret += `function sleep(e){const t=(new Date).getTime();for(let n=0;n<1e7&&!((new Date).getTime()-t>e);n++);} const toInt=parseInt;`;

		compileLoop:
		for(const element of program.body){
			if(element.type === "Keyword"){
				switch(element.value){
					case "print":
						ret += `console.log(${this.compile(this.parse(element.expressions), false)});`
						break;

					case "var":
						ret += `const ${element.varname}=${this.compile(this.parse(element.body), false)};`;
						break;

					case "mut":
						ret += `let ${element.varname}=${this.compile(this.parse(element.body), false)};`;
						break;

					case "wait":
						ret += `sleep(${Number(this.compile(this.parse(element.expressions),false)) * 1000});`;
						break;

					case "func":
						ret += `function ${element.expressions.join("")}${this.compile(this.parse(element.body),false)}};`
						break;

					case "return":
						ret += `return ${this.compile(this.parse(element.expressions),false)};`;
						break;
					
					case "input":
						ret += `prompt(${this.compile(this.parse(element.expressions),false)});`;
						break;

					case "using":
						ret += `import ${this.compile(this.parse(element.expressions),false)};`;
						break;

					case "export":
						ret += `export {${this.compile(this.parse(element.expressions),false)}};`
						break;
				}
			} else {
				switch (element.type) {
					case "String":
						ret += `${element.value}`;
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

					case "EOL":
						ret += ";";
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