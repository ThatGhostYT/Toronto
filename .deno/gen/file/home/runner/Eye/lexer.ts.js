import { Token } from "./Token.ts";
class Lexer {
    lex(code) {
        let ind = 0;
        let tokens = [];
        let operators = ["+", "-", "*", "/", "%"];
        let keywords = [
            "var",
            "print"
        ];
        let other = {
            "(": "LParen",
            ")": "RParen",
            "[": "LBracket",
            "]": "RBracket",
            "{": "LCurlyBracket",
            "}": "RCurlyBracket"
        };
        for (let i = 0; i < code.length; i++) {
            let char = code[i];
            if (char == "\n") {
                tokens.push(new Token("EOL", "EOL"));
            }
            else if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(char)) {
                let cur = char;
                while (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(code[i + 1]) && i + 1 < code.length) {
                    cur += code[i + 1];
                    i++;
                }
                tokens.push(new Token("Number", cur));
            }
            else if (char == '"') {
                let cur = "";
                while (code[i + 1] != '"' && i + 1 < code.length) {
                    cur += code[i + 1];
                    i++;
                }
                i++;
                tokens.push(new Token("String", "\"" + cur + "\""));
            }
            else if (operators.includes(char)) {
                tokens.push(new Token("Operator", char));
            }
            else if (char.match(/[a-zA-Z]+[0-9]*/g)) {
                let cur = char;
                while (code[i + 1]?.match(/[a-zA-Z]+[0-9]*/g) && i + 1 < code.length) {
                    cur += code[i + 1];
                    i++;
                }
                if (keywords.includes(cur)) {
                    tokens.push(new Token("Keyword", cur));
                }
                else {
                    tokens.push(new Token("Identifier", cur));
                }
            }
            else if (char == "#") {
                let cur = "";
                while (code[i + 1] != "\n" && i + 1 < code.length) {
                    cur += code[i + 1];
                    i++;
                }
                tokens.push(new Token("Comment", cur));
            }
            else if (char == "=") {
                if (i + 1 < code.length && code[i + 1] == "=") {
                    tokens.push(new Token("DEquals", "=="));
                }
                else {
                    tokens.push(new Token("Equals", char));
                }
            }
            else if (Object.keys(other).includes(char)) {
                tokens.push(new Token(other[char], char));
            }
        }
        return tokens;
    }
}
export { Lexer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9ob21lL3J1bm5lci9FeWUvbGV4ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLFlBQVksQ0FBQztBQUVqQyxNQUFNLEtBQUs7SUFDSCxHQUFHLENBQUMsSUFBWTtRQUN0QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLE1BQU0sR0FBWSxFQUFFLENBQUM7UUFFekIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFFekMsSUFBSSxRQUFRLEdBQUc7WUFDZCxLQUFLO1lBQ0wsT0FBTztTQUNQLENBQUE7UUFFRCxJQUFJLEtBQUssR0FBNEI7WUFDcEMsR0FBRyxFQUFFLFFBQVE7WUFDYixHQUFHLEVBQUUsUUFBUTtZQUNiLEdBQUcsRUFBRSxVQUFVO1lBQ2YsR0FBRyxFQUFFLFVBQVU7WUFDZixHQUFHLEVBQUUsZUFBZTtZQUNwQixHQUFHLEVBQUUsZUFBZTtTQUNwQixDQUFBO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBRWxCLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtnQkFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTthQUNuQztpQkFDSSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3RFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztnQkFDZixPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUM1RyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsQ0FBQyxFQUFFLENBQUM7aUJBQ0o7Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTthQUNyQztpQkFDSSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7Z0JBQ3JCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFDYixPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDakQsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ25CLENBQUMsRUFBRSxDQUFDO2lCQUNKO2dCQUNELENBQUMsRUFBRSxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQTthQUNuRDtpQkFDSSxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7YUFDeEM7aUJBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ3hDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztnQkFDZixPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNyRSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsQ0FBQyxFQUFFLENBQUM7aUJBQ0o7Z0JBRUQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO2lCQUN0QztxQkFBTTtvQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO2lCQUN6QzthQUNEO2lCQUNJLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtnQkFDckIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO2dCQUNaLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNsRCxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsQ0FBQyxFQUFFLENBQUM7aUJBQ0o7Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTthQUN0QztpQkFDSSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFO29CQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO2lCQUN2QztxQkFBTTtvQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO2lCQUN0QzthQUNEO2lCQUNJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7YUFDekM7U0FDRDtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztDQUNEO0FBRUQsT0FBTyxFQUFDLEtBQUssRUFBQyxDQUFDIn0=