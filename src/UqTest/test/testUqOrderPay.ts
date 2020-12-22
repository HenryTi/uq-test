import _ from 'lodash';
import { UQs, CustomerPayment } from "UqApp";
import { Console } from "../Console";
import { data } from '../mock-data';

export async function testUqOrderPay(uqs: UQs, console: Console) {
	let {Order, CustomerPendingReceivable} = uqs.CustomerPayment;

	console.log();
	console.log('== customer receivable');
	let queryReceivable1 = await CustomerPendingReceivable.query({customer: data.customer1});
	console.log(queryReceivable1);

	console.log();
	console.log('== customer pay');
	let sheetIds:number[] = [49];
	for (let i of sheetIds) {
		let pay = await Order.actionDirect(i, 0, '$', 'directPay');
		console.log(pay);
	}

	console.log();
	console.log('== customer receivable');
	let queryReceivable2 = await CustomerPendingReceivable.query({customer: data.customer1});
	console.log(queryReceivable2);
}
