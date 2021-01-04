import _ from 'lodash';
import { CustomerPayment } from "UqApp";
import { data } from '../mock-data';
import { UQsTester } from './tools';

export async function testUqOrderPay(tester: UQsTester) {
	let {uqs} = tester;
	let {Order, CustomerPendingReceivable} = uqs.CustomerPayment;

	tester.log();
	tester.log('== customer receivable');
	let queryReceivable1 = await tester.test(CustomerPendingReceivable.query({customer: data.customer1}));

	tester.log();
	tester.log('== customer pay');
	let sheetIds:number[] = [49];
	for (let i of sheetIds) {
		let pay = await tester.test(Order.actionDebugDirect(i, 0, '$', 'directPay'));
		tester.log(pay);
	}

	tester.log();
	tester.log('== customer receivable');
	let queryReceivable2 = await tester.test(CustomerPendingReceivable.query({customer: data.customer1}));
}
