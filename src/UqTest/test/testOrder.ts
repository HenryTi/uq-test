import _ from 'lodash';
import { CustomerPayment } from "UqApp";
import { data } from "../mock-data";
import { UQsTester } from './tools';

export async function testOrder(tester: UQsTester) {
	let {uqs} = tester;
	let {Order} = uqs.CustomerPayment;

	tester.log();
	tester.log('== order save');
	let retSave1 = await tester.test(Order.save('order test', data.order1));
}
