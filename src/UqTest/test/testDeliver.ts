import _ from 'lodash';
import { SheetSaveReturn } from 'tonva';
import { CustomerPayment } from "UqApp";
import { data } from "../mock-data";
import { pickRandomArr, UQsTester } from "./tools";

export async function testDeliver(tester: UQsTester) {
	let {Order} = tester.uqs.CustomerPayment;

	tester.log();
	tester.log('先发一半');
	await tester.test(deliver(tester, 50));
	tester.log();
	tester.log('再发一半的一半');
	await tester.test(deliver(tester, 50));
	tester.log();
	tester.log('再发全部剩下的');
	await tester.test(deliver(tester, 100));

	// 再看全部应收
	tester.log();
	tester.log('== customer pending deliver');
	let {CustomerPendingDeliver} = tester.uqs.CustomerPayment;
	await tester.test(CustomerPendingDeliver.query({customer: data.customer1}));
}

async function deliver(tester: UQsTester, percent: number) {
	let {uqs} = tester;
	tester.log();
	tester.log('== customer deliver');
	let {CustomerPendingDeliver} = uqs.CustomerPayment;
	let queryDeliver = await tester.test(CustomerPendingDeliver.query({customer: data.customer1}));
	if (queryDeliver.ret.length === 0) {
		tester.log('no pending deliver!');
		tester.log();
		return;
	}

	tester.log();
	tester.log(`== pick ${percent}% from customer deliver`);
	let r1 = pickRandomArr(queryDeliver.ret, percent);
	tester.log(r1);

	let retSaveSheetDeliver:SheetSaveReturn;
	let sheetDeliver: CustomerPayment.SheetDeliver = {
		customer:data.customer1,
		detail: r1.map(v => {
			let {id:pendingId, quantity, delivered} = v;
			return {pendingId, quantity: quantity - delivered}
		})
	}

	retSaveSheetDeliver = await tester.test(uqs.CustomerPayment.Deliver.saveDebugDirect('sheet deliver', sheetDeliver));
	if (retSaveSheetDeliver)
	tester.log();
	tester.log('sheet deliver saved');
	tester.log(retSaveSheetDeliver);

	tester.log();
	tester.log('sheet deliver confirmed');
	let retDeliverConfirm = await tester.test(uqs.CustomerPayment.Deliver.actionDebugDirect(
		retSaveSheetDeliver.id, 
		retSaveSheetDeliver.flow,
		retSaveSheetDeliver.state,
		'confirm'));
}
