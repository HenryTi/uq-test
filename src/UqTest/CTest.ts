import { CUqBase } from "UqApp";
import { data } from "./mock-data";
import { VResult } from "./VResult";
import { VTest } from "./VTest";
import { VConsole } from "./VConsole";
import { Console } from './Console';
import { testUqData } from "./test/testUqData";
import { testUqOrderPay } from "./test/testUqOrderPay";
import { testOrder } from "./test/testOrder";

export class CTest extends CUqBase {
	protected async internalStart() {
		this.openVPage(VTest);
	}

	saveOrder1 = async () => {
		let ret = await this.uqs.CustomerPayment.Order.save('order1', data.order1);
		this.openVPage(VResult, ret);
	}

	getOrder1 = async () => {
		let ret = await this.uqs.CustomerPayment.Order.getSheet(21);
		this.openVPage(VResult, ret);
	}

	confirmOrder1 = async () => {
		let ret = await this.uqs.CustomerPayment.Order.action(21, 0, '$', 'confirm');
		this.openVPage(VResult, ret);
	}

	pendingReceivable = async () => {
		let ret = await this.uqs.CustomerPayment.CustomerPendingReceivable.query({
			customer: 1,
		});
		this.openVPage(VResult, ret);
	}

	showConsole = async () => {
		let console:Console = await this.openVPage(VConsole);
		console.log('start at ' + new Date());
		console.log('=======');
		//await testUqData(this.uqs, console);
		//await testUqOrderPay(this.uqs, console);
		await testOrder(this.uqs, console);

		console.log();
		console.log('=======');
		console.log('end!');
	}
}
