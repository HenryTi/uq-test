import { UQs } from "UqApp";
import { Console } from "../../Console";

export class Tester {
	private console: Console;

	constructor(console: Console) {
		this.console = console;
	}

	log(content?:any) {
		this.console.log(content);
	}

	async test<T>(actionPromise: Promise<T>):Promise<T> {
		if (!actionPromise) return;
		try {
			let result = await actionPromise;
			this.console.log(result);
			return result;
		}
		catch (err) {
			this.console.log('error: ');
			if (err.message) this.console.log(err.message);
			if (err.stack) this.console.log(err.stack);
			this.console.log(err);
		}
	}
}

export class UQsTester extends Tester {
	readonly uqs: UQs;
	constructor(console:Console, uqs:UQs) {
		super(console);
		this.uqs = uqs;
	}
}
