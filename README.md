# Toronto
Toronto is a simple, general purpose programming language which compiles into javascript.
> **Toronto is still a work in progress.**

## Getting Started
Download [Deno](https://deno.land/), which is an alternative JavaScript runtime to Node.

Then, download this repository and use it as a template, don't touch any of the files besides `main.toronto`.

### Comments
To make a comment, use a `#` and then that entire line will be ignored.
```python
# This is a comment.
# Use it as many times as you want.
```

### Utilizing the console
To send data to the console, use the `print` keyword.
```python
print "Hello World!"
```

To get data from the console use the `input` keyword.
```javascript
var inp = input "What is your name?"
```

### Creating Variables
To make a variable use the `var` keyword.
```javascript
var string = "Hello World!"
```

To make a mutable variable use the `mut` keyword.
```rust
mut string = "Hello World!"
string = "Hello, World!"
```

### Template Strings
A template string allows us to substitute values in the string for something else.
```javascript
var name = "John Doe"
print 'Hello ${name}!'
```

### Making functions
To make a function use the `func` keyword.
```javascript
func sayHello(name){
	print 'Hello ${name}!'
}
```

Use `return` to return data.
```javascript
func add(x,y){
	return x + y
}
```

### Using builtin functions
Here are all the builtin functions, there arguments, and what they return.
+ `toInt` accepts a string with a number in it, then returns that string as a integer.
```python
print toInt("36") # >> 36
```
+ `sqrt` accepts a number and returns the square root of that number.
```python
print sqrt(25) # >> 5
```
+ `exec` accepts a string containing toronto code and executes it. Does not return anything.
```python
exec('print "Hello World"') # >> Hello World!
```

### Asynchronous Functions
To make a function asynchronous, use the `async` keyword.
```javascript
async func add(x,y){
	return x + y
}
```

This gives you access to the `await` keyword, which can be used to resolve promises.

### Using the main function
In toronto, the majority of your code lives inside the `main` function.
If you don't use the `main` function then your code will error.
```python
async func main(){ # Main function does not have to be asynchronous.
	print add(1,3)
}

func add(x,y){
	return x + y
}
```