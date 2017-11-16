export class Contact {

    constructor(private _firstName:string, private _lastName:string, private _phone:string, private _email: string ){}
    
    public get firstName(): string {
		return this._firstName;
	}

	public set firstName(value: string) {
		this._firstName = value;
	}

	public get lastName(): string {
		return this._lastName;
	}

	public set lastName(value: string) {
		this._lastName = value;
	}

	public get phone(): string {
		return this._phone;
	}

	public set phone(value: string) {
		this._phone = value;
	}

	public get email(): string {
		return this._email;
	}

	public set email(value: string) {
		this._email = value;
	}

	public get fullName(){
		return this.firstName+ ' '+ this.lastName; 
	}

	public toJSON(){
		return {
			first_name: this.firstName,
			last_name: this.lastName,
			email: this.email,
			phone: this.phone
		}
	}

}
