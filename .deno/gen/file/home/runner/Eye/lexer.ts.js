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
        const booleans = [
            "true",
            "false"
        ];
        for (let i = 0; i < code.length; i++) {
            let char = code[i];
            if (char == "\n") {
                tokens.push(new Token("EOL", "EOL"));
            }
            else if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(char)) {
                let cur = char;
                while (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(code[i + 1]) && i + 1 < code.length) {
                    cur += code[i + 1];
                    i++;
                }
                tokens.push(new Token("Number", parseInt(cur)));
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
                while (code[i + 1].match(/[a-zA-Z]+[0-9]*/g) && i + 1 < code.length) {
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
        }
        return tokens;
    }
}
export { Lexer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9ob21lL3J1bm5lci9FeWUvbGV4ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLFlBQVksQ0FBQztBQUVqQyxNQUFNLEtBQUs7SUFDSCxHQUFHLENBQUMsSUFBWTtRQUN0QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLE1BQU0sR0FBWSxFQUFFLENBQUM7UUFFekIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFFekMsSUFBSSxRQUFRLEdBQUc7WUFDZCxLQUFLO1lBQ0wsT0FBTztTQUNQLENBQUE7UUFFRCxNQUFNLFFBQVEsR0FBRztZQUNoQixNQUFNO1lBQ04sT0FBTztTQUNQLENBQUE7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFFbEIsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO2FBQ25DO2lCQUNJLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdEUsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO2dCQUNmLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdB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