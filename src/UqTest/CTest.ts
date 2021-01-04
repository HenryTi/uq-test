import { CUqBase, UQs } from "UqApp";
import { data } from "./mock-data";
import { VResult } from "./VResult";
import { VTest } from "./VTest";
import { VConsole } from "./VConsole";
import { Console } from './Console';
import { testUqData } from "./test/testUqData";
import { testUqOrderPay } from "./test/testUqOrderPay";
import { testOrder } from "./test/testOrder";
import { testReceivable } from "./test/testReceivble";
import { testDeliver } from "./test/testDeliver";
import { testSaveOrder } from "./test/testSaveOrder";
import { Tester, UQsTester } from "./test/tools/tester";
import { testInvoice } from "./test/testInvoice";

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
		let tester = new UQsTester(console, this.uqs);
		await tester.test(test(tester));
	}
}

async function test(tester: UQsTester) {
	tester.log('start at ' + new Date())
	tester.log('=======');

	await tester.test(testSaveOrder(tester));
	await tester.test(testInvoice(tester));
	await tester.test(testDeliver(tester));
	await tester.test(testReceivable(tester));

	tester.log();
	tester.log('=======');
	tester.log('end!');
}
