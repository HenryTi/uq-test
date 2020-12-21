import { CUqBase } from "UqApp";
import './test.css';
import { data } from "./mock-data";
import { VResult } from "./VResult";
import { VTest } from "./VTest";

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
}
