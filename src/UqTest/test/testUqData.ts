import _ from 'lodash';
import { UQs, CustomerPayment } from "UqApp";
import { Console } from "../Console";
import { data } from "../mock-data";
import { pickRandomArr } from "../tools/pickRandomArr";

export async function testUqData(uqs: UQs, console: Console) {
	let {Order} = uqs.CustomerPayment;

	console.log();
	console.log('== order save');
	let retSave1 = await Order.save('order test', data.order1);
	console.log(retSave1);

	console.log();
	console.log('== order confirm');
	let retConfirm = await Order.actionDirect(retSave1.id, retSave1.flow, retSave1.state, 'confirm');
	console.log(retConfirm);

	console.log();
	console.log('== order save');
	let retSave2 = await Order.save('order test', data.order2);
	console.log(retSave2);

	console.log();
	console.log('== order confirm');
	let retConfirm2 = await Order.actionDirect(retSave2.id, retSave2.flow, retSave2.state, 'confirm');
	console.log(retConfirm2);

	console.log();
	console.log('== customer receivable');
	let {CustomerPendingReceivable} = uqs.CustomerPayment;
	let queryReceivable = await CustomerPendingReceivable.query({customer: data.customer1});
	console.log(queryReceivable);

	console.log();
	console.log('== customer pending deliver');
	let {CustomerPendingDeliver} = uqs.CustomerPayment;
	let pendingDeliver = await CustomerPendingDeliver.query({customer: data.customer1});
	console.log(pendingDeliver);

	console.log();
	console.log('== customer pending invoice');
	let {CustomerPendingInvoice} = uqs.CustomerPayment;
	let pendingInvoice = await CustomerPendingInvoice.query({customer: data.customer1});
	console.log(pendingInvoice);

	console.log();
	console.log('== pick 50% from customer receivable');
	let r1 = pickRandomArr(queryReceivable.ret, 50);
	console.log(r1);

	console.log();
	console.log('== pick 50% from left customer receivable');
	let r2 = pickRandomArr(_.without(queryReceivable.ret, ...r1), 50);
	console.log(r2);

	console.log();
	console.log('== pick rest customer receivable');
	let r3 = _.without(queryReceivable.ret, ...r1, ...r2);
	console.log(r3);

	console.log();
	console.log('== pick customer balance');
	let retBalance = await uqs.CustomerPayment.GetCustomerBalance.query({customer:data.customer1});
	console.log(retBalance);

	console.log();
	console.log('== pick customer history');
	let retHistory1 = await uqs.CustomerPayment.GetCustomerHistory.page({
		customer:data.customer1,
		before: undefined,
	}, undefined, 1000);
	console.log(retHistory1);

}
