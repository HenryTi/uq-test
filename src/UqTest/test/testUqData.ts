import _ from 'lodash';
import { CustomerPayment } from "UqApp";
import { data } from "../mock-data";
import { pickRandomArr, UQsTester } from "./tools";

export async function testUqData(tester: UQsTester) {
	let {uqs} = tester;
	let {Order} = uqs.CustomerPayment;

	tester.log();
	tester.log('== order save');
	let retSave1 = await Order.save('order test', data.order1);
	tester.log(retSave1);

	tester.log();
	tester.log('== order confirm');
	let retConfirm = await tester.test(Order.actionDebugDirect(retSave1.id, retSave1.flow, retSave1.state, 'confirm'));

	tester.log();
	tester.log('== order save');
	let retSave2 = await tester.test(Order.save('order test', data.order2));

	tester.log();
	tester.log('== order confirm');
	let retConfirm2 = await tester.test(Order.actionDebugDirect(retSave2.id, retSave2.flow, retSave2.state, 'confirm'));

	tester.log();
	tester.log('== customer receivable');
	let {CustomerPendingReceivable} = uqs.CustomerPayment;
	let queryReceivable = await tester.test(CustomerPendingReceivable.query({customer: data.customer1}));

	tester.log();
	tester.log('== customer pending deliver');
	let {CustomerPendingDeliver} = uqs.CustomerPayment;
	let pendingDeliver = await tester.test(CustomerPendingDeliver.query({customer: data.customer1}));

	tester.log();
	tester.log('== customer pending invoice');
	let {CustomerPendingInvoice} = uqs.CustomerPayment;
	let pendingInvoice = await tester.test(CustomerPendingInvoice.query({customer: data.customer1}));

	tester.log();
	tester.log('== pick 50% from customer receivable');
	let r1 = pickRandomArr(queryReceivable.ret, 50);
	tester.log(r1);

	tester.log();
	tester.log('== pick 50% from left customer receivable');
	let r2 = pickRandomArr(_.without(queryReceivable.ret, ...r1), 50);
	tester.log(r2);

	tester.log();
	tester.log('== pick rest customer receivable');
	let r3 = _.without(queryReceivable.ret, ...r1, ...r2);
	tester.log(r3);

	tester.log();
	tester.log('== pick customer balance');
	let retBalance = await tester.test(uqs.CustomerPayment.GetCustomerAccount.query({customer:data.customer1}));

	tester.log();
	tester.log('== pick customer history');
	let retHistory1 = await tester.test(uqs.CustomerPayment.GetCustomerHistory.page({
		customer:data.customer1,
		earlier: undefined,
	}, undefined, 1000));
}
