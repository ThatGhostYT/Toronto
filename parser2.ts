import { Token } from "./Token.ts";

interface Program{
	body: {[key: string]: any}[];
}

class Parser2 {
	parse(tokens: Token[]){
		const program: Program = {
			body: []
		}

		for(let i = 0; i< tokens.length; i++){
			let cur = tokens[i]

			let precedence: {[key: any]: any} = {
				"*": 2,
				"/": 2,
				"+": 1,
				"-": 1
			}

			if (cur.type == "Operator") {
				let expr = {}
				if (precedence[cur.value] == Math.max(Object.values(precedence))) {
					
				}
			}
		}
		
		return program;
	}

	compile(program: Program){

	}
}

export {Parser};