import _ from 'lodash';
import { UQs, CustomerPayment } from "UqApp";
import { Console } from "../Console";
import { data } from "../mock-data";

export async function testOrder(uqs: UQs, console: Console) {
	let {Order} = uqs.CustomerPayment;

	console.log();
	console.log('== order save');
	let retSave1 = await Order.save('order test', data.order1);
	console.log(retSave1);
}
