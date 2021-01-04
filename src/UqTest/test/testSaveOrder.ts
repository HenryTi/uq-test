import _ from 'lodash';
import { CustomerPayment } from "UqApp";
import { data } from "../mock-data";
import { UQsTester } from './tools';

export async function testSaveOrder(tester: UQsTester) {
	let {uqs} = tester;
	let {Order} = uqs.CustomerPayment;

	tester.log();
	tester.log('== order save');
	let retSave1 = await tester.test(Order.saveDebugDirect('order test', data.order1));

	tester.log();
	tester.log('== order save');
	let retSave2 = await tester.test(Order.saveDebugDirect('order test', data.order2));

	tester.log();
	tester.log('== order confirm');
	let retConfirm1 = await tester.test(Order.actionDebugDirect(retSave1.id, retSave1.flow, retSave1.state, 'confirm'));

	tester.log();
	tester.log('== order confirm');
	let retConfirm2 = await tester.test(Order.actionDebugDirect(retSave2.id, retSave2.flow, retSave2.state, 'confirm'));
}
