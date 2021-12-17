# Toronto
Toronto is a simple, general purpose programming language which compiles into javascript.
> **Toronto is still a work in progress.**

## Getting Started
Download [Deno](https://deno.land/), which is an alternative JavaScript runtime to Node.

Then, download this repository and use it as a template, don't touch any of the files besides `main.tor`.

### Keywords & Functions
*Keywords:*
+ `var` - Makes a new variable (e.g. `var string = "Hello World!"`)
+ `mut` - Makes a mutable variable (e.g. `mut i = 0`)
+ `func` - Creates a new function (e.g. `func main(){}`)
+ `print` - Logs content in the *stdout* (e.g. `print "Hello World!"`)
+ `wait` - Yeilds following code for a certain number of seconds (e.g. `wait 5`)
+ `input` - Gets input from the terminal (e.g. `input "What is your name?`)
+ `return` - Returns a value (e.g. `return "Hello World!"`)
+ `null` - Represents nothing

*Functions:*
+ `toInt` - Takes an argument and returns an integer.
```python
print toInt("36") # >> 36
```