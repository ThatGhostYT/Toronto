const keywords = [
    "var"
];
class Parser {
    parse(tokens) {
        let ret = "";
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (token.type === "Comment") {
                ret += `\/\/${token.value}`;
                continue;
            }
            if (token.type === "EOL") {
                ret += "\n";
                continue;
            }
            if (token.type === "String") {
                ret += token.value;
                continue;
            }
            if (token.type === "Number") {
                const operator = tokens[++i];
                if (operator.type === "Operator") {
                    const num = tokens[++i];
                    if (num.type === "Number") {
                        switch (operator.value) {
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
            if (token.type === "Keyword") {
                if (token.value === "var") {
                    const var_name = tokens[++i];
                    if (var_name.type === "Identifier") {
                        const equals = tokens[++i];
                        if (equals.type !== "Equals") {
                            ret = `Variable operator must be =`;
                            break;
                        }
                        const var_val = tokens[++i];
                        ret += `let ${var_name.value} = ${var_val.value};`;
                    }
                    else if (var_name.type === "Keyword") {
                        ret = `${var_name.value} is a keyword and cannot be overwritten.`;
                    }
                }
                else if (token.value === "print") {
                    const print = tokens[++i];
                    ret += `console.log(${print.value});`;
                }
                continue;
            }
        }
        return ret;
    }
}
export { Parser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9ob21lL3J1bm5lci9FeWUvcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sUUFBUSxHQUFHO0lBQ2hCLEtBQUs7Q0FDTCxDQUFDO0FBRUYsTUFBTSxNQUFNO0lBQ1gsS0FBSyxDQUFDLE1BQWU7UUFDcEIsSUFBSSxHQUFHLEdBQVcsRUFBRSxDQUFDO1FBRXJCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ3JDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV4QixJQUFHLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFDO2dCQUMzQixHQUFHLElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzVCLFNBQVM7YUFDVDtZQUVELElBQUcsS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUM7Z0JBQ3ZCLEdBQUcsSUFBSSxJQUFJLENBQUM7Z0JBQ1osU0FBUzthQUNUO1lBRUQsSUFBRyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBQztnQkFDMUIsR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ25CLFNBQVM7YUFDVDtZQUVELElBQUcsS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUM7Z0JBQzFCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUU3QixJQUFHLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFDO29CQUMvQixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFeEIsSUFBRyxHQUFHLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBQzt3QkFDeEIsUUFBTyxRQUFRLENBQUMsS0FBSyxFQUFDOzRCQUNyQixLQUFLLEdBQUc7Z0NBQ1AsR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztnQ0FDL0IsTUFBTTs0QkFDUCxLQUFLLEdBQUc7Z0NBQ1AsR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztnQ0FDL0IsTUFBTTs0QkFDUCxLQUFLLEdBQUc7Z0NBQ1AsR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztnQ0FDL0IsTUFBTTs0QkFDUCxLQUFLLEdBQUc7Z0NBQ1AsR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztnQ0FDL0IsTUFBTTs0QkFDUCxLQUFLLEdBQUc7Z0NBQ1AsR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztnQ0FDL0IsTUFBTTt5QkFDUDtxQkFDRDtpQkFDRDtnQkFDRCxTQUFTO2FBQ1Q7WUFFRCxJQUFHLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFDO2dCQUMzQixJQUFHLEtBQUssQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFDO29CQUN4QixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFN0IsSUFBRyxRQUFRLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBQzt3QkFDakMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBRTNCLElBQUcsTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUM7NEJBQzNCLEdBQUcsR0FBRyw2QkFBNkIsQ0FBQzs0QkFDcEMsTUFBTTt5QkFDTjt3QkFFRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFFNUIsR0FBRyxJQUFJLE9BQU8sUUFBUSxDQUFDLEtBQUssTUFBTSxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUM7cUJBQ25EO3lCQUFNLElBQUcsUUFBUSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUM7d0JBQ3JDLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLDBDQUEwQyxDQUFDO3FCQUNsRTtpQkFDRDtxQkFBTSxJQUFHLEtBQUssQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFDO29CQUNqQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDMUIsR0FBRyxJQUFJLGVBQWUsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDO2lCQUN0QztnQkFDRCxTQUFTO2FBQ1Q7U0FDRDtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ1osQ0FBQztDQUNEO0FBRUQsT0FBTyxFQUFDLE1BQU0sRUFBQyxDQUFDIn0=