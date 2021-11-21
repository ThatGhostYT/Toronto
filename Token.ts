class Token{
	public type: string;
	public value: any;

	constructor(type: string, value: any){
		this.type = type;
		this.value = value;
	}
}

export {Token};