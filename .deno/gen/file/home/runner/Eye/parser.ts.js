class Parser {
    parse(tokens) {
        const program = {
            body: []
        };
        for (let i = 0; i < tokens.length; i++) {
            switch (tokens[i].type) {
                case "Number":
                    if (tokens[i].value.toString().includes(".")) {
                        program.body.push({
                            type: "Float",
                            value: tokens[i].value.toString()
                        });
                    }
                    else {
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
                    const word = tokens[i].value;
                    const expressions = [];
                    while (i < tokens.length && tokens[i].type !== "EOL") {
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
                default:
                    if (tokens[i].type === "EOL")
                        break;
                    program.body.push({
                        type: tokens[i].type,
                        value: tokens[i].value
                    });
            }
        }
        return program;
    }
    compile(program) {
        let ret = "";
        for (const element of program.body) {
            if (element.type === "Keyword") {
                switch (element.value) {
                    case "print":
                        ret += `console.log(${element.expressions.join("")});`;
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
export { Parser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9ob21lL3J1bm5lci9FeWUvcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE1BQU0sTUFBTTtJQUNYLEtBQUssQ0FBQyxNQUFlO1FBQ3BCLE1BQU0sT0FBTyxHQUFZO1lBQ3hCLElBQUksRUFBRSxFQUFFO1NBQ1IsQ0FBQTtRQUVELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ3BDLFFBQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBQztnQkFDckIsS0FBSyxRQUFRO29CQUNaLElBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUM7d0JBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzRCQUNqQixJQUFJLEVBQUUsT0FBTzs0QkFDYixLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7eUJBQ2pDLENBQUMsQ0FBQztxQkFDSDt5QkFBSzt3QkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDakIsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO3lCQUNqQyxDQUFDLENBQUM7cUJBQ0g7b0JBQ0QsTUFBTTtnQkFFUCxLQUFLLFFBQVE7b0JBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7d0JBQ2pCLElBQUksRUFBRSxRQUFRO3dCQUNkLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtB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